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

app.get("/api/health", (_req, res) => {
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
