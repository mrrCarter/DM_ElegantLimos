import { useContext, useState } from "react";
import { BookingContext } from "./BookingContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import {
  isStripeConfigured,
  resolveApiBaseUrl,
} from "@/lib/runtimeConfig";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

function CheckoutForm({ onNext, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const { bookingData, setBookingData } = useContext(BookingContext);
  const navigate = useNavigate();
  const apiBaseUrl = resolveApiBaseUrl({
    envBaseUrl: import.meta.env.VITE_API_BASE_URL,
    browserOrigin: typeof window !== "undefined" ? window.location.origin : "",
  });
  const stripeConfigured = isStripeConfigured(import.meta.env) && Boolean(stripe);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleGratuityChange = (e) => {
    let value = Number.parseFloat(e.target.value);
    if (value < 20) value = 20;
    setGratuityPercentage(value);
    setBookingData((prev) => ({
      ...prev,
      gratuityPercentage: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripeConfigured || !stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const amount = Math.round(Number.parseFloat(bookingData.totalPrice) * 100);
      const idempotencyKey =
        typeof window !== "undefined" && window.crypto?.randomUUID
          ? window.crypto.randomUUID()
          : `booking-${Date.now()}`;

      const response = await fetch(`${apiBaseUrl}/api/payments/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify({
          amount,
        }),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        throw new Error(
          errorPayload?.error || "Failed to create payment intent"
        );
      }

      const { clientSecret } = await response.json();

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
        throw new Error(result.error.message);
      }

      if (result.paymentIntent.status === "succeeded") {
        setBookingData((prev) => ({
          ...prev,
          paymentIntentId: result.paymentIntent.id,
          currentStep: 4,
          highestStep: 4,
        }));
        if (onNext) {
          onNext();
        }
        navigate("/booking-receved");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      setErrorMessage(error.message || "Payment failed. Please try again.");
    } finally {
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
        <hr className="my-4" />
        <h4 className="heading-20-medium color-text mb-20">Billing Address</h4>
        <div className="row">
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
            Ride Fare: ${bookingData.basePrice}
          </li>
          {Number.parseFloat(bookingData.carSeatCharge) > 0 && (
            <li className="list-group-item">
              Car Seats: ${bookingData.carSeatCharge}
            </li>
          )}
          <li className="list-group-item">
            Subtotal: ${bookingData.price}
          </li>
          <li className="list-group-item">
            Gratuity ({gratuityPercentage}%): $
            {bookingData.gratuityAmount}
          </li>
          <li className="list-group-item font-weight-bold">
            Total Price: ${bookingData.totalPrice}
          </li>
        </ul>
        <p className="mt-15">
          All payments include gratuity for exceptional service.
        </p>
        {!stripeConfigured && (
          <div className="alert alert-warning mt-3">
            Payments are temporarily unavailable because Stripe is not configured
            for this environment yet.
          </div>
        )}
      </div>

      <h3 className="heading-24-medium color-text mb-30 mt-30">
        Payment Information
      </h3>

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

      {errorMessage && (
        <div className="alert alert-danger mt-3">{errorMessage}</div>
      )}

      <div className="mt-30 mb-120">
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onBack}
            disabled={loading}
          >
            Back
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!stripeConfigured || loading}
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
  if (!stripePromise) {
    return (
      <div className="alert alert-warning">
        Add `VITE_STRIPE_PUBLISHABLE_KEY` to enable card payments in this
        environment.
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm onNext={onNext} onBack={onBack} />
    </Elements>
  );
}
