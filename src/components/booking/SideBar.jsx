// SideBar.jsx

import React, { useState, useEffect, useContext } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import PlacePicker from "@/components/common/PlacePicker";
import DatePickerComponent from "@/components/common/DatePicker";
import TimePickerComponent from "@/components/common/TimePicker";
import { BookingContext } from "./BookingContext";
import { FaUser, FaSuitcase, FaClock, FaPlane } from "react-icons/fa";
import Modal from "react-modal";
import axios from "axios";
import "../../styles/style.scss"; // Ensure the CSS file is imported

// Set the app element for accessibility
Modal.setAppElement("#root"); // Replace '#root' with your app's root element ID

const containerStyle = {
  width: "100%",
  height: "200px",
};

// Function to format phone numbers
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "";
  // Assuming phoneNumber is a 10-digit number
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

function SideBar() {
  const { bookingData, setBookingData } = useContext(BookingContext);
  const {
    fromAddress,
    toAddress,
    date,
    time,
    directionsResponse,
    distanceText,
    durationText,
    passengerInfo,
    vehicle,
    price,
    gratuityPercentage,
    totalPrice,
    cardLast4Digits,
    currentStep,
    tripType,
    numberOfHours,
  } = bookingData;

  const [isEditing, setIsEditing] = useState(false);
  const [isMapsApiLoaded, setIsMapsApiLoaded] = useState(false);
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
  const [flightStatus, setFlightStatus] = useState(null);

  // Local state for editing
  const [localData, setLocalData] = useState({
    fromAddress: fromAddress || "",
    toAddress: toAddress || "",
    date: date ? new Date(date) : null,
    time: time ? new Date(time) : null,
    passengers: passengerInfo?.passengers || 1,
    luggage: passengerInfo?.luggage || 0,
    tripType: tripType || "One Way", // Default trip type
  });

  // Check if Google Maps API is loaded
  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsMapsApiLoaded(true);
    } else {
      const interval = setInterval(() => {
        if (window.google && window.google.maps) {
          setIsMapsApiLoaded(true);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  // Calculate route when addresses change
  useEffect(() => {
    if (isMapsApiLoaded && fromAddress && toAddress) {
      calculateRoute(fromAddress, toAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapsApiLoaded, fromAddress, toAddress]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);

    // Reset local data when entering edit mode
    if (!isEditing) {
      setLocalData({
        fromAddress: fromAddress || "",
        toAddress: toAddress || "",
        date: date ? new Date(date) : null,
        time: time ? new Date(time) : null,
        passengers: passengerInfo?.passengers || 1,
        luggage: passengerInfo?.luggage || 0,
        tripType: tripType || "One Way",
      });
    }
  };

  const handleSave = () => {
    setIsEditing(false);

    setBookingData((prev) => ({
      ...prev,
      fromAddress: localData.fromAddress,
      toAddress: localData.toAddress,
      date: localData.date,
      time: localData.time,
      passengerInfo: {
        ...(prev.passengerInfo || {}),
        passengers: localData.passengers,
        luggage: localData.luggage,
      },
      tripType: localData.tripType,
      directionsResponse: null, // Reset directions to trigger recalculation
      distanceText: null,
      durationText: null,
    }));

    if (isMapsApiLoaded && localData.fromAddress && localData.toAddress) {
      calculateRoute(localData.fromAddress, localData.toAddress);
    }
  };

  const calculateRoute = (origin, destination) => {
    if (!isMapsApiLoaded) {
      console.error("Google Maps API is not loaded yet.");
      return;
    }

    if (origin === "" || destination === "") {
      console.error("Origin or destination is empty.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          const route = result.routes[0];
          const leg = route.legs[0];

          setBookingData((prev) => ({
            ...prev,
            directionsResponse: result,
            distanceText: leg.distance.text,
            durationText: leg.duration.text,
            distanceValue: leg.distance.value,
            durationValue: leg.duration.value,
          }));
        } else {
          console.error(`Error fetching directions ${status}`);
        }
      }
    );
  };

  const handleInputChange = (field) => (value) => {
    setLocalData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Commenting out flight status functionality
  // const openFlightModal = () => {
  //   fetchFlightStatus();
  //   setIsFlightModalOpen(true);
  // };

  // const closeFlightModal = () => {
  //   setIsFlightModalOpen(false);
  // };

  // const fetchFlightStatus = async () => {
  //   try {
  //     const apiKey = '9f84d58043edc166f92d84d25f33be73'; // Your API Key here

  //     const response = await axios.get(`http://api.aviationstack.com/v1/flights`, {
  //       params: {
  //         access_key: apiKey,
  //         flight_iata: passengerInfo.flightNumber,
  //       },
  //     });

  //     if (response.data.error) {
  //       console.error("API Error:", response.data.error);
  //       setFlightStatus({ error: response.data.error.message });
  //       return;
  //     }

  //     if (response.data && response.data.data && response.data.data.length > 0) {
  //       const flightData = response.data.data[0];

  //       setFlightStatus({
  //         status: flightData.flight_status,
  //         arrivalTime: flightData.arrival.estimated || flightData.arrival.scheduled,
  //         date: flightData.arrival.estimated
  //           ? new Date(flightData.arrival.estimated).toLocaleDateString()
  //           : new Date(flightData.arrival.scheduled).toLocaleDateString(),
  //         gateNumber: flightData.arrival.gate || "N/A",
  //       });
  //     } else {
  //       console.log("No flight information available.");
  //       setFlightStatus({ error: "Flight information not available." });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching flight status:", error);
  //     setFlightStatus({ error: "Unable to fetch flight status." });
  //   }
  // };

  if (!isMapsApiLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <div className="box-tab-right">
      <div className="sidebar">
        <div className="d-flex align-items-center justify-content-between">
          <h6 className="text-20-medium color-text">Ride Summary</h6>
          <button
            className="text-14-medium color-text text-decoration-underline btn btn-link p-0"
            onClick={handleEditToggle}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="mt-20">
          {/* Display Client Name */}
          {passengerInfo?.firstName && (
            <div className="client-name mb-2">
              <strong>
                {`${passengerInfo.firstName} ${passengerInfo.lastName}`}
              </strong>
              {passengerInfo.phone && (
                <div>
                  <a href={`tel:${passengerInfo.phone}`} className="ml-2">
                    {formatPhoneNumber(passengerInfo.phone)}
                  </a>
                </div>
              )}
            </div>
          )}

          {isEditing ? (
            <div>
              <PlacePicker
                label="Pickup Location"
                value={localData.fromAddress}
                onChange={handleInputChange("fromAddress")}
              />
              <PlacePicker
                label="Drop-off Location"
                value={localData.toAddress}
                onChange={handleInputChange("toAddress")}
              />
              <div className="mb-3">
                <label>Date</label>
                <DatePickerComponent
                  value={localData.date}
                  onChange={handleInputChange("date")}
                />
              </div>
              <div className="mb-3">
                <label>Time</label>
                <TimePickerComponent
                  value={localData.time}
                  onChange={handleInputChange("time")}
                />
              </div>
              <div className="mb-3">
                <label>
                  <FaUser className="icon" /> Passengers
                </label>
                <select
                  className="form-control"
                  value={localData.passengers}
                  onChange={(e) =>
                    handleInputChange("passengers")(parseInt(e.target.value))
                  }
                >
                  {[...Array(10)].map((_, idx) => (
                    <option key={idx} value={idx + 1}>
                      {idx + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label>
                  <FaSuitcase className="icon" /> Luggage
                </label>
                <select
                  className="form-control"
                  value={localData.luggage}
                  onChange={(e) =>
                    handleInputChange("luggage")(parseInt(e.target.value))
                  }
                >
                  {[...Array(10)].map((_, idx) => (
                    <option key={idx} value={idx}>
                      {idx}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label>Trip Type</label>
                <select
                  className="form-control"
                  value={localData.tripType}
                  onChange={(e) => handleInputChange("tripType")(e.target.value)}
                >
                  <option value="One Way">One Way</option>
                  <option value="Round Trip">Round Trip</option>
                  <option value="Hourly">Hourly</option>
                  <option value="Airport Pickup">Airport Pickup</option>
                </select>
              </div>
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          ) : (
            <>
              {/* Display the ride summary */}
              <ul className="list-routes">
                <li>
                  <span className="location-item">A </span>
                  <span className="info-location text-14-medium">
                    {fromAddress || "Pickup location not specified."}
                  </span>
                </li>
                <li>
                  <span className="location-item">B </span>
                  <span className="info-location text-14-medium">
                    {toAddress || "Drop-off location not specified."}
                  </span>
                </li>
              </ul>

              {/* Trip Type */}
              <div className="trip-type-info mt-20">
                <span className="text-14 color-grey">Trip Type:</span>
                <span className="text-14-medium color-text">{tripType}</span>
              </div>

              {/* Display additional trip type details */}
              {tripType === "Hourly" && (
                <div className="mt-2">
                  <div className="d-flex align-items-center">
                    <FaClock className="mr-2" />
                    <span className="text-14-medium color-text">
                      {numberOfHours} Hours
                    </span>
                  </div>
                </div>
              )}

              {/* Passenger and Luggage Information */}
              {passengerInfo && (
                <div className="passenger-luggage-info mt-20">
                  <div className="d-flex justify-content-between">
                    <div
                      className="info-item"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <FaUser style={{ marginRight: "5px" }} />
                      <span className="info-text text-14-medium">
                        {passengerInfo.passengers}
                      </span>
                    </div>
                    <div
                      className="info-item"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <FaSuitcase style={{ marginRight: "5px" }} />
                      <span className="info-text text-14-medium">
                        {passengerInfo.luggage}
                      </span>
                    </div>
                  </div>
                  {/* Note to Driver */}
                  {passengerInfo.notes && (
                    <div className="mt-2">
                      <strong>Note to Driver:</strong>
                      <p className="text-14-medium">{passengerInfo.notes}</p>
                    </div>
                  )}
                </div>
              )}

              {directionsResponse && (
                <div className="mt-20">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    options={{
                      disableDefaultUI: true,
                      gestureHandling: "none",
                    }}
                  >
                    <DirectionsRenderer
                      directions={directionsResponse}
                      options={{
                        suppressMarkers: false,
                        preserveViewport: false, // Auto-adjust viewport
                      }}
                    />
                  </GoogleMap>
                </div>
              )}

              <div className="box-info-route">
                <div className="info-route-left">
                  <span className="text-14 color-grey">Total Distance</span>
                  <span className="text-14-medium color-text">
                    {distanceText || "Calculating..."}
                  </span>
                </div>
                <div className="info-route-left">
                  <span className="text-14 color-grey">Total Time</span>
                  <span className="text-14-medium color-text">
                    {durationText || "Calculating..."}
                  </span>
                </div>
              </div>

              {/* Display Vehicle and Price */}
              {vehicle && price && (
                <div className="vehicle-price-info mt-20">
                  <div className="info-item">
                    <span className="text-14 color-grey">Vehicle: </span>
                    <span className="text-14-medium color-text">
                      {vehicle.title}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="text-14 color-grey">Base Price: </span>
                    <span className="text-14-medium color-text">
                      ${parseFloat(price).toFixed(2)}
                    </span>
                  </div>
                  {/* Car Seat Charge */}
                  {passengerInfo.carSeatCount > 0 && (
                    <div className="info-item">
                      <span className="text-14 color-grey">
                        Car Seats ({passengerInfo.carSeatCount} x $25):
                      </span>
                      <span className="text-14-medium color-text">
                        ${passengerInfo.carSeatCount * 25}
                      </span>
                    </div>
                  )}
                  {/* Display Gratuity and Total Price */}
                  {totalPrice && (
                    <>
                      <div className="info-item">
                        <span className="text-14 color-grey">
                          Gratuity ({gratuityPercentage}%):{" "}
                        </span>
                        <span className="text-14-medium color-text">
                          $
                          {(
                            (gratuityPercentage / 100) * parseFloat(price)
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="text-14 color-grey">Total Price: </span>
                        <span className="text-14-medium color-text">
                          ${parseFloat(totalPrice).toFixed(2)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Display Card Last 4 Digits and Passenger Name */}
              {cardLast4Digits && passengerInfo && (
                <div className="payment-info mt-20">
                  <div className="info-item">
                    <span className="text-14 color-grey">
                      Card Ending With:
                    </span>
                    <span className="text-14-medium color-text">
                      **** **** **** {cardLast4Digits}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="text-14 color-grey">Passenger:</span>
                    <span className="text-14-medium color-text">
                      {passengerInfo.firstName} {passengerInfo.lastName}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Flight Status Modal - Commented Out */}
      {/* <Modal
        isOpen={isFlightModalOpen}
        onRequestClose={closeFlightModal}
        contentLabel="Flight Status"
        className="flight-modal"
        overlayClassName="flight-modal-overlay"
      >
        <h2>Flight Status for {passengerInfo.flightNumber}</h2>
        {flightStatus ? (
          flightStatus.error ? (
            <div className="flight-status-error">
              <p>Error: {flightStatus.error}</p>
            </div>
          ) : (
            <div className="flight-status-info">
              <p>Status: {flightStatus.status}</p>
              <p>Arrival Time: {flightStatus.arrivalTime}</p>
              <p>Date: {flightStatus.date}</p>
              <p>Gate Number: {flightStatus.gateNumber}</p>
            </div>
          )
        ) : (
          <p>Loading flight status...</p>
        )}
        <button className="btn btn-secondary" onClick={closeFlightModal}>
          Close
        </button>
      </Modal> */}
    </div>
  );
}

export default React.memo(SideBar);
