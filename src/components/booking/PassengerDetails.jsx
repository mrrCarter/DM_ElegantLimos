// PassengerDetails.jsx

import React, { useEffect, useState, useContext } from "react";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "./BookingContext";

export default function PassengerDetails() {
  const navigate = useNavigate();
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
    navigate("/booking-payment");
  };

  useEffect(() => {
    // Any additional effects
  }, []);

  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30">
            Passenger Details
          </h3>
          <div className="form-contact form-comment">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={passengerInfo.firstName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={passengerInfo.lastName}
                    onChange={handleInputChange}
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
                    placeholder="Email Address"
                    value={passengerInfo.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    className="form-control"
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={passengerInfo.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-30"></div>
          <h3 className="heading-24-medium color-text mb-30">Options</h3>
          <div className="form-contact form-comment">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  Passengers
                  <select
                    className="form-control"
                    id="passengers"
                    name="passengers"
                    value={passengerInfo.passengers}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Number of Passengers
                    </option>
                    {[...Array(10)].map((_, idx) => (
                      <option key={idx} value={idx + 1}>
                        {idx + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  Luggage
                  <select
                    className="form-control"
                    id="luggage"
                    name="luggage"
                    value={passengerInfo.luggage}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Number of Luggage Items
                    </option>
                    {[...Array(10)].map((_, idx) => (
                      <option key={idx} value={idx}>
                        {idx}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="notes"
                    name="notes"
                    rows="5"
                    placeholder="Notes to Driver..."
                    value={passengerInfo.notes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-30 mb-120">
            <button
              className="btn btn-primary btn-primary-big w-100"
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
      </div>
      <SideBar />
    </div>
  );
}
