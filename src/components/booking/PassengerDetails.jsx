// PassengerDetails.jsx

import React, { useState, useContext, useEffect } from "react";
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
      carSeatCount: 0,
      flightNumber: "",
    }
  );

  const [tripType, setTripType] = useState(bookingData.tripType || "Point-to-Point");
  const [numberOfHours, setNumberOfHours] = useState(
    bookingData.numberOfHours || 3
  );

  // Update max car seat count based on vehicle type
  const [maxCarSeats, setMaxCarSeats] = useState(
    bookingData.vehicle?.type === "SUV" ? 4 : 2
  );

  useEffect(() => {
    if (bookingData.vehicle?.type === "SUV") {
      setMaxCarSeats(4);
    } else if (bookingData.vehicle?.type === "Sedan") {
      setMaxCarSeats(2);
    }
  }, [bookingData.vehicle]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleTripTypeChange = (e) => {
    setTripType(e.target.value);
  };

  const handleContinue = () => {
    setBookingData((prev) => ({
      ...prev,
      tripType,
      numberOfHours,
      passengerInfo,
    }));
    onNext();
  };

  return (
    <>
      <h3 className="heading-24-medium color-text mb-30">
        Passenger Details
      </h3>

      {/* Trip Type Dropdown */}
      <div className="form-group">
          Trip Type
        <label htmlFor="tripType" className="form-label">
        </label>
        <select
          className="form-control"
          id="tripType"
          name="tripType"
          value={tripType}
          onChange={handleTripTypeChange}
        >
          <option value="Point-to-Point">Point-to-Point</option>
          <option value="Hourly">Hourly</option>
          <option value="Airport Pickup">Airport Pickup</option>
        </select>
      </div>

      {/* Conditional Fields */}
      {tripType === "Hourly" && (
        <div className="form-group">
            Number of Hours (Minimum 3)
          <label htmlFor="numberOfHours" className="form-label">
          </label>
          <input
            type="number"
            className="form-control"
            id="numberOfHours"
            name="numberOfHours"
            min="3"
            value={numberOfHours}
            onChange={(e) => setNumberOfHours(parseInt(e.target.value))}
            required
          />
        </div>
      )}

      <div className="form-contact form-comment">
        <div className="row">
          {/* Flight Number for Airport Pickup */}
          {tripType === "Airport Pickup" && (
            <div className="col-lg-6">
              <label htmlFor="flightNumber" className="form-label">
                Flight Number
              </label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="flightNumber"
                  name="flightNumber"
                  placeholder="e.g., AA1234"
                  value={passengerInfo.flightNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}
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
          {/* Car Seat Count */}
          <div className="col-lg-6">
            <label htmlFor="carSeatCount" className="form-label">
              Car Seat Count ($25 per seat)
            </label>
            <div className="form-group">
              <select
                className="form-control"
                id="carSeatCount"
                name="carSeatCount"
                value={passengerInfo.carSeatCount}
                onChange={handleInputChange}
              >
                {Array.from({ length: maxCarSeats + 1 }, (_, idx) => (
                  <option key={idx} value={idx}>
                    {idx}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
            disabled={
              !passengerInfo.firstName ||
              !passengerInfo.lastName ||
              !passengerInfo.email ||
              !passengerInfo.phone ||
              (tripType === "Hourly" && numberOfHours < 3) ||
              (tripType === "Airport Pickup" && !passengerInfo.flightNumber)
            }
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
