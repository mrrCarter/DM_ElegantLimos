// SideBar.jsx

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import PlacePicker from "@/components/common/PlacePicker";
import DatePickerComponent from "@/components/common/DatePicker";
import TimePickerComponent from "@/components/common/TimePicker";

const containerStyle = {
  width: "100%",
  height: "200px",
};

export default function SideBar({
  initialFromAddress,
  initialToAddress,
  initialDate,
  initialTime,
  setDistanceValue,
  setDurationValue,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [date, setDate] = useState(initialDate ? new Date(initialDate) : null);
  const [time, setTime] = useState(initialTime ? new Date(initialTime) : null);

  const [distanceText, setDistanceText] = useState(null);
  const [durationText, setDurationText] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [isMapsApiLoaded, setIsMapsApiLoaded] = useState(false);

  // Update addresses when initial props change
  useEffect(() => {
    setFromAddress(initialFromAddress || "");
    setToAddress(initialToAddress || "");
  }, [initialFromAddress, initialToAddress]);

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
      calculateRoute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapsApiLoaded, fromAddress, toAddress]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (isMapsApiLoaded && fromAddress && toAddress) {
      calculateRoute();
    }
  };

  const calculateRoute = () => {
    if (!isMapsApiLoaded) {
      console.error("Google Maps API is not loaded yet.");
      return;
    }

    if (fromAddress === "" || toAddress === "") {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: fromAddress,
        destination: toAddress,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirectionsResponse(result);
          const route = result.routes[0];
          const leg = route.legs[0];
          setDistanceText(leg.distance.text);
          setDurationText(leg.duration.text);

          if (setDistanceValue) setDistanceValue(leg.distance.value);
          if (setDurationValue) setDurationValue(leg.duration.value);
        } else {
          console.error(`Error fetching directions ${status}`);
        }
      }
    );
  };

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
          {isEditing ? (
            <div>
              <PlacePicker
                label="Pickup Location"
                value={fromAddress}
                onChange={setFromAddress}
              />
              <PlacePicker
                label="Drop-off Location"
                value={toAddress}
                onChange={setToAddress}
              />
              <div className="mb-3">
                <label className="text-14 color-grey">Date</label>
                <DatePickerComponent value={date} onChange={setDate} />
              </div>
              <div className="mb-3">
                <label className="text-14 color-grey">Time</label>
                <TimePickerComponent value={time} onChange={setTime} />
              </div>
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          ) : (
            <>
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

              <ul className="list-icons">
                <li>
                  <span className="icon-item icon-plan"> </span>
                  <span className="info-location text-14-medium">
                    {date
                      ? new Date(date).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Date not specified."}
                  </span>
                </li>
                <li>
                  <span className="icon-item icon-time"></span>
                  <span className="info-location text-14-medium">
                    {time
                      ? new Date(time).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "Time not specified."}
                  </span>
                </li>
              </ul>

              {directionsResponse && (
                <div className="mt-20">
                  <GoogleMap
                    key={`${fromAddress}-${toAddress}`} // Add key to force re-render
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
