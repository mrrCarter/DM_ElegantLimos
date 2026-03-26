import "dotenv/config";

import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "..", "dist");

const app = express();
const port = Number.parseInt(process.env.PORT, 10) || 4242;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY ?? "";
const stripeClient = stripeSecretKey ? new Stripe(stripeSecretKey) : null;
const corsOrigins = (process.env.CORS_ORIGINS_CSV ?? "http://localhost:1573")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

app.disable("x-powered-by");
app.set("trust proxy", true);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "100kb" }));

app.use((req, res, next) => {
  const isSecureRequest = req.secure || req.get("x-forwarded-proto") === "https";
  const contentSecurityPolicy = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "img-src 'self' data: blob: https:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://api.emailjs.com https://api.stripe.com https://m.stripe.com https://maps.googleapis.com https://maps.gstatic.com",
    "script-src 'self' 'unsafe-inline' https://js.stripe.com https://maps.googleapis.com",
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.google.com",
    "worker-src 'self' blob:",
    "form-action 'self'",
  ].join("; ");

  res.setHeader("Content-Security-Policy", contentSecurityPolicy);
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(self)");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");

  if (isSecureRequest) {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }

  next();
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    stripeConfigured: Boolean(stripeClient),
  });
});

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
  });
});

app.get("/ready", (_req, res) => {
  res.json({
    ok: true,
    stripeConfigured: Boolean(stripeClient),
  });
});

app.post("/api/payments/create-payment-intent", async (req, res) => {
  if (!stripeClient) {
    res.status(503).json({
      error: "Stripe is not configured on the server.",
    });
    return;
  }

  const amount = Number.parseInt(req.body?.amount, 10);
  if (!Number.isInteger(amount) || amount <= 0) {
    res.status(400).json({
      error: "A valid positive amount is required.",
    });
    return;
  }

  try {
    const paymentIntent = await stripeClient.paymentIntents.create(
      {
        amount,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      },
      {
        idempotencyKey:
          req.get("Idempotency-Key") ?? `payment-intent-${Date.now()}`,
      }
    );

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      error: "Unable to create a payment intent.",
    });
  }
});

if (distPath) {
  app.use(
    express.static(distPath, {
      index: false,
      maxAge: "7d",
    })
  );
}

app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`DM Elegant Limos server listening on port ${port}`);
});
