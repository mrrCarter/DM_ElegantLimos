// server.js

require("dotenv").config(); // Load environment variables

const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist")));

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    // Create a PaymentIntent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: "usd",
      payment_method_types: ["card"],
      expand: ["charges"], // Expand charges to include them in the response
    });

    // Send the client secret to the client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    // Handle errors
    console.error("Error creating payment intent:", err);
    res.status(500).json({ error: err.message });
  }
});

// Serve the index.html file for any unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));
