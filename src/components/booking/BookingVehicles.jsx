// BookingVehicles.jsx

import React, { useState } from "react";
import Pagination from "../common/Pagination";
import { cars } from "@/data/cars";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

export default function BookingVehicles() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    fromAddress: initialFromAddress,
    toAddress: initialToAddress,
    date: initialDate,
    time: initialTime,
  } = location.state || {};

  const [distanceValue, setDistanceValue] = useState(null); // in meters
  const [durationValue, setDurationValue] = useState(null); // in seconds

  const calculatePrice = (vehicleType) => {
    const distanceInMiles = distanceValue ? distanceValue / 1609.34 : 0;
    const durationInMinutes = durationValue ? durationValue / 60 : 0;

    // Base rates
    const minimumFare = 75;
    const baseRatePerMile = vehicleType === "Luxury Class" ? 3.75 : 4.5;
    const baseRatePerMinute = 0.5;

    const fare = Math.max(
      minimumFare,
      distanceInMiles * baseRatePerMile + durationInMinutes * baseRatePerMinute
    );

    return fare.toFixed(2);
  };

  const handleSelectVehicle = (vehicle) => {
    const price = calculatePrice(vehicle.title);
    const bookingDetails = {
      vehicle,
      price,
      fromAddress: initialFromAddress,
      toAddress: initialToAddress,
      date: initialDate,
      time: initialTime,
      distanceValue,
      durationValue,
    };
    navigate("/booking-extra", { state: bookingDetails });
  };

  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30">
            Select Your Car
          </h3>
          <div className="list-vehicles">
            {cars
              .filter(
                (car) =>
                  car.title === "Luxury Class" || car.title === "SUV Class"
              )
              .map((elm, i) => (
                <div key={i} className="item-vehicle">
                  <div className="vehicle-left">
                    <div className="vehicle-image">
                      <img src={elm.imgSrc} alt={elm.title} />
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
                    <div className="mt-10">
                      <Link className="link text-14-medium" to="#">
                        Show more information
                      </Link>
                    </div>
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
                        Passengers {elm.passenger}
                      </span>
                      <span className="luggage">Luggage {elm.luggage}</span>
                    </div>
                    <div className="vehicle-price mb-10">
                      {distanceValue && durationValue ? (
                        <>
                          <span className="price-label">Price:</span>
                          <span className="price-value">
                            ${calculatePrice(elm.title)}
                          </span>
                        </>
                      ) : (
                        <span>Calculating price...</span>
                      )}
                    </div>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleSelectVehicle(elm)}
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
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <Pagination />
        </div>
      </div>
      <SideBar
        initialFromAddress={initialFromAddress}
        initialToAddress={initialToAddress}
        initialDate={initialDate}
        initialTime={initialTime}
        setDistanceValue={setDistanceValue}
        setDurationValue={setDurationValue}
      />
    </div>
  );
}
