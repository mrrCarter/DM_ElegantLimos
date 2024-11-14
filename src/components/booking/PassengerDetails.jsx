// PassengerDetails.jsx

import React, { useState, useContext } from "react";
import { BookingContext } from "./BookingContext";

export default function PassengerDetails({ onNext, onBack }) {
  const { bookingData, setBookingData } = useContext(BookingContext);

  const [passengerInfo, setPassengerInfo] = useState(
    bookingData.passengerInfo || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      passengers: 1,
      luggage: 0,
      notes: "",
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    setBookingData((prev) => ({ ...prev, passengerInfo }));
    onNext();
  };

  return (
    <>
      <h3 className="heading-24-medium color-text mb-30">
        Passenger Details
      </h3>
      <div className="form-contact form-comment">
        <div className="row">
          {/* First Name */}
          <div className="col-lg-6">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
            <div className="form-group">
              <input
                className="form-control"
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                value={passengerInfo.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          {/* Last Name */}
          <div className="col-lg-6">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
            <div className="form-group">
              <input
                className="form-control"
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                value={passengerInfo.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          {/* Email */}
          <div className="col-lg-6">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
            <div className="form-group">
              <input
                className="form-control"
                id="email"
                name="email"
                type="email"
                placeholder="example@domain.com"
                value={passengerInfo.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          {/* Phone */}
          <div className="col-lg-6">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
            <div className="form-group">
              <input
                className="form-control"
                id="phone"
                name="phone"
                type="tel"
                placeholder="e.g., +1 (555) 123-4567"
                value={passengerInfo.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-30"></div>
      <h3 className="heading-24-medium color-text mb-30">Options</h3>
      <div className="form-contact form-comment">
        <div className="row">
          {/* Passengers */}
          <div className="col-lg-6">
              <label htmlFor="passengers" className="form-label">
                Number of Passengers
              </label>
            <div className="form-group">
              <select
                className="form-control"
                id="passengers"
                name="passengers"
                value={passengerInfo.passengers}
                onChange={handleInputChange}
              >
                {[...Array(10)].map((_, idx) => (
                  <option key={idx} value={idx + 1}>
                    {idx + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Luggage */}
          <div className="col-lg-6">
              <label htmlFor="luggage" className="form-label">
                Number of Luggage Items
              </label>
            <div className="form-group">
              <select
                className="form-control"
                id="luggage"
                name="luggage"
                value={passengerInfo.luggage}
                onChange={handleInputChange}
              >
                {[...Array(10)].map((_, idx) => (
                  <option key={idx} value={idx}>
                    {idx}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Notes */}
          <div className="col-lg-12">
              <label htmlFor="notes" className="form-label">
                Additional Notes for Driver
              </label>
            <div className="form-group">
              <textarea
                className="form-control"
                id="notes"
                name="notes"
                rows="5"
                placeholder="Specify any special instructions or requests for the driver..."
                value={passengerInfo.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-30 mb-120">
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
          <button
            className="btn btn-primary"
            onClick={handleContinue}
          >
            Continue
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
      </div>
    </>
  );
}
