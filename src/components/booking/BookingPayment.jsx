// BookingPayment.jsx

import React, { useEffect, useState, useContext } from "react";
import { BookingContext } from "./BookingContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";


// Load Stripe publishable key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ onNext, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const { bookingData, setBookingData } = useContext(BookingContext);
  const navigate = useNavigate();

  const [billingInfo, setBillingInfo] = useState({
    name: bookingData.passengerInfo
      ? `${bookingData.passengerInfo.firstName} ${bookingData.passengerInfo.lastName}`
      : "",
    email: bookingData.passengerInfo?.email || "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  // Use gratuityPercentage from BookingContext
  const [gratuityPercentage, setGratuityPercentage] = useState(
    bookingData.gratuityPercentage || 20
  );

  const [loading, setLoading] = useState(false); // For loading indicator
  const [errorMessage, setErrorMessage] = useState(""); // For error handling

  // Function to handle changes in the billing info
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle changes in gratuity
  const handleGratuityChange = (e) => {
    let value = parseFloat(e.target.value);
    if (value < 20) value = 20;
    setGratuityPercentage(value);
    setBookingData((prev) => ({
      ...prev,
      gratuityPercentage: value,
    }));
  };

  // Function to calculate total price
  useEffect(() => {
    const basePrice = parseFloat(bookingData.price) || 0;
    const gratuityPercent = gratuityPercentage || 0;
  
    const gratuityAmount = (gratuityPercent / 100) * basePrice;
    const total = basePrice + gratuityAmount + parseFloat(bookingData.carSeatCharge);
  
    setBookingData((prev) => ({
      ...prev,
      totalPrice: total.toFixed(2),
      gratuityPercentage: gratuityPercent,
    }));
  }, [bookingData.price, gratuityPercentage, setBookingData]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setLoading(true);
    setErrorMessage(""); // Reset error message

    try {
      // Create PaymentIntent on the server
      const response = await fetch(
        "http://localhost:4242/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Math.round(bookingData.totalPrice * 100), // Convert to cents
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await response.json();

      // Confirm the payment on the client
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: billingInfo.name,
            email: billingInfo.email,
            address: {
              line1: billingInfo.address,
              city: billingInfo.city,
              state: billingInfo.state,
              country: billingInfo.country,
              postal_code: billingInfo.postalCode,
            },
          },
        },
      });

      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.error(result.error.message);
        setErrorMessage(result.error.message);
        setLoading(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // Payment succeeded

          // Ensure charges and payment_method_details exist
          const charges = result.paymentIntent.charges;
          if (charges && charges.data && charges.data.length > 0) {
            const paymentMethodDetails = charges.data[0].payment_method_details;
            const last4 = paymentMethodDetails.card?.last4 || "N/A";

            // Save the last 4 digits of the card
            setBookingData((prev) => ({
              ...prev,
              cardLast4Digits: last4,
            }));
          } else {
            console.warn("Charges data not available.");
          }

          // Navigate to booking-received page
          setLoading(false);
          navigate("/booking-receved");
        }
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      setErrorMessage("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Billing Information Form */}
      <div className="form-contact form-comment">
        <h3 className="heading-20-medium color-text mb-20">
          Billing Information
        </h3>
        <div className="row">
          {/* Name */}
          <div className="col-lg-6">
            <div className="form-group">
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                placeholder="Full Name"
                value={billingInfo.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          {/* Email */}
          <div className="col-lg-6">
            <div className="form-group">
              <input
                className="form-control"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={billingInfo.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        {/* Separator */}
        <hr className="my-4" />
        <h4 className="heading-20-medium color-text mb-20">Billing Address</h4>
        <div className="row">
          {/* Address */}
          <div className="col-lg-12">
            <div className="form-group">
              <input
                className="form-control"
                id="address"
                name="address"
                type="text"
                placeholder="Street address"
                value={billingInfo.address}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* City */}
          <div className="col-lg-4">
            <div className="form-group">
              <input
                className="form-control"
                id="city"
                name="city"
                type="text"
                placeholder="City"
                value={billingInfo.city}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* State */}
          <div className="col-lg-4">
            <div className="form-group">
              <input
                className="form-control"
                id="state"
                name="state"
                type="text"
                placeholder="State"
                value={billingInfo.state}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Postal Code */}
          <div className="col-lg-4">
            <div className="form-group">
              <input
                className="form-control"
                id="postalCode"
                name="postalCode"
                type="text"
                placeholder="Postal Code"
                value={billingInfo.postalCode}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Country */}
          <div className="col-lg-12">
            <div className="form-group">
              <input
                className="form-control"
                id="country"
                name="country"
                type="text"
                placeholder="Country"
                value={billingInfo.country}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gratuity Field */}
      <div className="form-contact form-comment">
        <div className="row">
          {/* Gratuity Percentage */}
          <div className="col-lg-4">
            <label htmlFor="gratuity">Gratuity (%)</label>
            <div className="form-group">
              <input
                className="form-control"
                id="gratuity"
                name="gratuity"
                type="number"
                min="20"
                placeholder="Gratuity Percentage"
                value={gratuityPercentage}
                onChange={handleGratuityChange}
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="price-breakdown mt-30">
        <h4 className="heading-24-medium color-text mb-20">
          Price Breakdown
        </h4>
        <ul className="list-group">
          <li className="list-group-item">
            Base Price: ${parseFloat(bookingData.price).toFixed(2)}
          </li>
          <li className="list-group-item">
            Gratuity ({gratuityPercentage}%): $
            {(
              (gratuityPercentage / 100) * parseFloat(bookingData.price)
            ).toFixed(2)}
          </li>
          <li className="list-group-item font-weight-bold">
            Total Price: ${bookingData.totalPrice}
          </li>
        </ul>
        <p className="mt-15">
          All payments include gratuity for exceptional service.
        </p>
      </div>

      <h3 className="heading-24-medium color-text mb-30 mt-30">
        Payment Information
      </h3>

      {/* Payment Information */}
      <div className="form-contact form-comment">
        <div className="form-group">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      </div>

      {/* Display error message */}
      {errorMessage && (
        <div className="alert alert-danger mt-3">{errorMessage}</div>
      )}

      <div className="mt-30 mb-120">
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={onBack} disabled={loading}>
            Back
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!stripe || loading}
          >
            {loading ? "Processing..." : "Pay Now"}
            {!loading && (
              <svg
                className="icon-16 ml-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default function BookingPayment({ onNext, onBack }) {
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm onNext={onNext} onBack={onBack} />
      </Elements>
    </>
  );
}
