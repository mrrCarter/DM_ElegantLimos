// server.js

require("dotenv").config(); // Load environment variables

const express = require("express");
const app = express();
const cors = require("cors");


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



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
