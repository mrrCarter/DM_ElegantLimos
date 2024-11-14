// server.js

require("dotenv").config(); // Load environment variables

const express = require("express");
const app = express();
const cors = require("cors");

const Stripe_Secret_Key =
  "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";
const stripe = require("stripe")(Stripe_Secret_Key);



app.use(cors());
app.use(express.static("."));
app.use(express.json());

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

app.listen(4242, () => console.log("Node server listening on port 4242!"));
