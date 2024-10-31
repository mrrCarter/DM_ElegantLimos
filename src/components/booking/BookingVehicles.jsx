import React, { useState } from 'react';

import Pagination from "../common/Pagination";
import { cars, features } from "@/data/cars";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PlacePicker from "@/components/common/PlacePicker";

export default function BookingVehicles() {
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState(""); // Retrieve passed state

    // // Function to handle setting the addresses from the PlacePicker component
    // const handleFromAddressChange = (address) => setFromAddress(address);
    // const handleToAddressChange = (address) => setToAddress(address);

  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
            Select Your Car
          </h3>
          <div className="list-vehicles wow fadeInUp">
            {cars
              .filter(
                (car) => car.title === "Luxury Class" || car.title === "SUV Class"
              )
              .map((elm, i) => (
                <div key={i} className="item-vehicle wow fadeInUp">
                  <div className="vehicle-left">
                    <div className="vehicle-image">
                      <img src={elm.imgSrc} alt="luxride" />
                    </div>
                    <div className="vehicle-facilities">
                      <div className="text-fact meet-greeting">
                        Meet & Greet included
                      </div>
                      <div className="text-fact free-cancel">
                        Free cancellation
                      </div>
                      <div className="text-fact free-waiting">
                        Free Waiting time
                      </div>
                      <div className="text-fact safe-travel">
                        Safe and secure travel
                      </div>
                    </div>
                    {/* <div className="mt-10">
                      <Link
                        className="link text-14-medium"
                        to="/booking-extra"
                      >
                        Show more information
                      </Link>
                    </div> */}
                  </div>
                  <div className="vehicle-right">
                    <h5 className="text-20-medium color-text mb-10">
                      {elm.title}
                    </h5>
                    <p className="text-14 color-text mb-20">
                      {elm.description}
                    </p>
                    <div className="vehicle-passenger-luggage mb-10">
                      <span className="passenger">
                        Passengers: {elm.passenger}
                      </span>
                      <span className="luggage">
                        Luggage: {elm.luggage}
                      </span>
                    </div>
                    <Link
                      className="btn btn-primary w-100"
                      to="/booking-receved"
                    >
                      Select
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
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="box-tab-right">
        <div className="sidebar">
          <div className="d-flex align-items-center justify-content-between wow fadeInUp">
            <h6 className="text-20-medium color-text">Ride Summary</h6>
            <a
              className="text-14-medium color-text text-decoration-underline"
              href="/"
            >
              Edit
            </a>
          </div>
          <div className="mt-20 wow fadeInUp">
            <ul className="list-routes">
              <li>
                <span className="location-item">A </span>
                <span className="info-location text-14-medium">
                  {fromAddress || "Enter Pickup Location"}
                </span>
              </li>
              <li>
                <span className="location-item">B </span>
                <span className="info-location text-14-medium">
                  {toAddress || "Enter Dropoff Location"}
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-20 wow fadeInUp">
            <ul className="list-icons">
              <li>
                <span className="icon-item icon-plan"> </span>
                <span className="info-location text-14-medium">
                  Thu, Oct 06, 2022
                </span>
              </li>
              <li>
                <span className="icon-item icon-time"></span>
                <span className="info-location text-14-medium">
                  6 PM : 15
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="sidebar wow fadeInUp">
          <ul className="list-ticks list-ticks-small list-ticks-small-booking">
            {features.map((elm, i) => (
              <li key={i} className="text-14 mb-20">
                {elm}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
