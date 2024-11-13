// BookingPayment.jsx
import React, { useEffect, useState, useContext } from "react";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "./BookingContext";

// Import Stripe components
// Commented out for now since we're bypassing payment processing
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// Comment out the Stripe initialization
// const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY"); // Replace with your Stripe publishable key

function CheckoutForm() {
  // Comment out the Stripe hooks
  // const stripe = useStripe();
  // const elements = useElements();
  const navigate = useNavigate();
  const { bookingData, setBookingData } = useContext(BookingContext);

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
  const { gratuityPercentage } = bookingData;

  // Function to handle changes in the billing info
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle changes in gratuity
  const handleGratuityChange = (e) => {
    const value = e.target.value;
    setBookingData((prev) => ({
      ...prev,
      gratuityPercentage: value,
    }));
  };

  // Function to calculate total price
  useEffect(() => {
    const basePrice = parseFloat(bookingData.price) || 0;
    const gratuityPercent = parseFloat(bookingData.gratuityPercentage) || 0;

    const gratuityAmount = (gratuityPercent / 100) * basePrice;
    const total = basePrice + gratuityAmount;

    setBookingData((prev) => ({
      ...prev,
      totalPrice: total.toFixed(2),
    }));
  }, [bookingData.price, bookingData.gratuityPercentage, setBookingData]);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Navigate directly to the booking received page
    navigate("/booking-receved");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Billing Information Form */}
      {/* ... existing billing info form fields ... */}

      {/* Gratuity Field */}
      <div className="form-contact form-comment">
        <div className="row">
          {/* Gratuity Percentage */}
          <div className="col-lg-6">
            <div className="form-group">
              <label htmlFor="gratuity">Gratuity (%)</label>
              <div className="input-group">
                <input
                  className="form-control"
                  id="gratuity"
                  name="gratuity"
                  type="number"
                  min="0"
                  placeholder="Gratuity Percentage"
                  value={gratuityPercentage}
                  onChange={handleGratuityChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="price-breakdown mt-30">
        <h4 className="heading-24-medium color-text mb-20">Price Breakdown</h4>
        <ul className="list-group">
          <li className="list-group-item">
            Base Price: ${parseFloat(bookingData.price).toFixed(2)}
          </li>
          <li className="list-group-item">
            Gratuity ({gratuityPercentage}%): $
            {(
              (gratuityPercentage / 100) *
              parseFloat(bookingData.price)
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
      {/* Commented out CardElement since we're not processing payments */}
      {/* 
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
      */}

      <div className="mt-30 mb-120">
        <button
          className="btn btn-primary btn-primary-big w-100"
          type="submit"
          // Remove the disabled condition since stripe is undefined
          // disabled={!stripe}
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
  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          {/* Remove the Elements wrapper since we're not using Stripe */}
          {/* <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements> */}
          <CheckoutForm />
        </div>
      </div>
      <SideBar />
    </div>
  );
}
