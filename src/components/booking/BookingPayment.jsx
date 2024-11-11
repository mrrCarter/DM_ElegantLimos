// BookingPayment.jsx

import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useNavigate, useLocation } from "react-router-dom";

// Import Stripe components
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_live_51OzCUDCyMsNPevYe1ektcDaMWrGA1qRZCucJjwQbxoIW2uBcgM8jVZbb4G70alFN8efPmew9F92fkfzVn3RANXrI00O8PHlQwj"); // Replace with your Stripe publishable key

function CheckoutForm({ bookingData }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Create payment method
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: billingInfo.name,
        email: billingInfo.email,
        address: {
          line1: billingInfo.address,
          city: billingInfo.city,
          country: billingInfo.country,
          postal_code: billingInfo.postalCode,
        },
      },
    });

    if (error) {
      console.error(error);
      // Handle error accordingly
    } else {
      // Process payment and booking
      // For now, we can navigate to a confirmation page
      navigate("/booking-received", {
        state: { ...bookingData, paymentMethod },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="heading-24-medium color-text mb-30">
        Billing Information
      </h3>
      <div className="form-contact form-comment">
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Full Name
              </label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={billingInfo.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* ... other billing fields ... */}
          <div className="col-lg-6">
            <div className="form-group">
              <label className="form-label" htmlFor="email">@stripe/stripe-js
                Email Address
              </label>
              <input
                className="form-control"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={billingInfo.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Address, city, country, postal code inputs */}
        </div>
      </div>
      <h3 className="heading-24-medium color-text mb-30">
        Payment Information
      </h3>
      <div className="form-contact form-comment">
        <div className="form-group">
          <label className="form-label">Card Details</label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                },
              },
            }}
          />
        </div>
      </div>
      <div className="mt-30 mb-120">
        <button
          className="btn btn-primary btn-primary-big w-100"
          type="submit"
          disabled={!stripe}
        >
          Pay Now
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
        </button>
      </div>
    </form>
  );
}

export default function BookingPayment() {
  const location = useLocation();
  const bookingData = location.state || {};

  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <Elements stripe={stripePromise}>
            <CheckoutForm bookingData={bookingData} />
          </Elements>
        </div>
      </div>
      <SideBar
        initialFromAddress={bookingData.fromAddress}
        initialToAddress={bookingData.toAddress}
        initialDate={bookingData.date}
        initialTime={bookingData.time}
      />
    </div>
  );
}
