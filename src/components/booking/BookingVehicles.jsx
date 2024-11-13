// BookingVehicles.jsx

import React, { useState, useContext } from "react";
import Pagination from "../common/Pagination";
import { cars } from "@/data/cars";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { BookingContext } from "./BookingContext";

export default function BookingVehicles() {
  const navigate = useNavigate();
  const { bookingData, setBookingData } = useContext(BookingContext);

  const calculatePrice = (vehicleType) => {
    const distanceInMiles = bookingData.distanceValue
      ? bookingData.distanceValue / 1609.34
      : 0;
    const durationInMinutes = bookingData.durationValue
      ? bookingData.durationValue / 60
      : 0;

    // Base rates
    const minimumFare = 75;
    const baseRatePerMile = vehicleType === "Luxury Class" ? 3.75 : 4.5;
    const baseRatePerMinute = 1.5;

    const fare = Math.max(
      minimumFare,
      distanceInMiles * baseRatePerMile +
        durationInMinutes * baseRatePerMinute
    );

    return fare.toFixed(2);
  };

  const handleSelectVehicle = (vehicle) => {
    const price = calculatePrice(vehicle.title);

    setBookingData((prev) => ({
      ...prev,
      vehicle,
      price,
    }));

    navigate("/booking-passenger");
  };

  const calculateRoute = async () => {
    // ... your existing route calculation logic ...

    const directionsService = new window.google.maps.DirectionsService();

    const result = await directionsService.route({
      origin: bookingData.fromAddress,
      destination: bookingData.toAddress,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    // Save the directions response
    setBookingData((prev) => ({
      ...prev,
      directionsResponse: result,
      distanceText: result.routes[0].legs[0].distance.text,
      durationText: result.routes[0].legs[0].duration.text,
      // ... any other data you need ...
    }));
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
                      <a className="link text-14-medium" href="#">
                        Show more information
                      </a>
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
                      {bookingData.distanceValue &&
                      bookingData.durationValue ? (
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
        </div>
      </div>
      <SideBar />
    </div>
  );
}
