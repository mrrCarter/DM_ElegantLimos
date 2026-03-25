// BookingVehicles.jsx

import { useContext } from "react";
import { cars } from "@/data/cars";
import { BookingContext } from "./BookingContext";
import { calculateTripFare } from "@/lib/booking";

export default function BookingVehicles({ onNext }) {
  const { bookingData, setBookingData } = useContext(BookingContext);

  const calculatePrice = (vehicleType) => {
    return calculateTripFare({
      vehicleTitle: vehicleType,
      distanceValue: bookingData.distanceValue,
      durationValue: bookingData.durationValue,
    });
  };

  const handleSelectVehicle = (vehicle) => {
    const price = calculatePrice(vehicle.title);

    setBookingData((prev) => ({
      ...prev,
      vehicle,
      price,
    }));

    onNext(); // Move to the next step
  };

  return (
    <>
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
                     {elm.passenger}
                  </span>
                  <span className="luggage">{elm.luggage}</span>
                </div>
                <div className="vehicle-price mb-10">
                  <>
                    <span className="price-label">Starting at: </span>
                    <span className="price-value">${calculatePrice(elm.title)}</span>
                  </>
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
    </>
  );
}
