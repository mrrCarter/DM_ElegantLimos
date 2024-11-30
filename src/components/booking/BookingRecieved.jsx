// BookingReceived.jsx

import React, { useEffect, useContext, useState } from "react";
import { BookingContext } from "./BookingContext";
import emailjs from "emailjs-com";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

// Environment Variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_CLIENT = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CLIENT;
const TEMPLATE_ID_COMPANY = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_COMPANY;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function BookingReceived() {
  const { bookingData } = useContext(BookingContext);
  const navigate = useNavigate();
  const {
    fromAddress,
    toAddress,
    date,
    time,
    passengerInfo,
    vehicle,
    price,
    gratuityPercentage,
    totalPrice,
    cardLast4Digits,
    distanceText,
    durationText,
    tripType,
    numberOfHours,
  } = bookingData;

  const [directionsResponse, setDirectionsResponse] = useState(null);

  // Generate a new order number each time the component is accessed
  const [orderNumber, setOrderNumber] = useState(() => {
    // Retrieve the last order number from localStorage
    const lastOrderNumber = parseInt(localStorage.getItem("lastOrderNumber"), 10) || 999;
    const newOrderNumber = lastOrderNumber + 1;
    // Store the new order number in localStorage
    localStorage.setItem("lastOrderNumber", newOrderNumber);
    console.log(`Generated new order number: ${newOrderNumber}`); // Debugging line
    return newOrderNumber.toString();
  });

  useEffect(() => {
    // Calculate directions
    calculateRoute();

    // Send emails
    sendEmails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateRoute = async () => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API is not loaded yet.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: bookingData.fromAddress,
        destination: bookingData.toAddress,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirectionsResponse(result);
        } else {
          console.error(`Error fetching directions ${status}`);
        }
      }
    );
  };

  const sendEmails = () => {
    const templateParams = {
      to_email: passengerInfo?.email || "info@dmelegantlimos.com",
      order_number: `#${orderNumber}`, // Use the generated order number
      fromAddress,
      toAddress,
      date: date ? new Date(date).toLocaleDateString() : "",
      time: time ? new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
      first_name: passengerInfo?.firstName || "",
      last_name: passengerInfo?.lastName || "",
      email: passengerInfo?.email || "",
      phone: passengerInfo?.phone || "",
      vehicle: vehicle?.title || "",
      base_price: parseFloat(price).toFixed(2),
      gratuity_percentage: gratuityPercentage,
      total_price: totalPrice,
      distance: distanceText,
      duration: durationText,
      status: "Paid",
      card_last4: cardLast4Digits, // Added for reference
      trip_type: tripType,
      number_of_hours: numberOfHours,
      flight_number: passengerInfo?.flightNumber,
      car_seat_count: passengerInfo?.carSeatCount,
    };

    // Send email to client
    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID_CLIENT,
        templateParams,
        PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log(
            "Email sent to client successfully!",
            response.status,
            response.text
          );
        },
        (error) => {
          console.error("Failed to send email to client:", error);
        }
      );

    // Send email to company
    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID_COMPANY,
        { ...templateParams, to_email: "info@dmelegantlimo.com" },
        PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log(
            "Email sent to company successfully!",
            response.status,
            response.text
          );
        },
        (error) => {
          console.error("Failed to send email to company:", error);
        }
      );
  };

  // Calculate car seat charges
  const carSeatCharge = (passengerInfo.carSeatCount || 0) * 25;

  // Calculate gratuity amount
  const gratuityAmount = (gratuityPercentage / 100) * parseFloat(price);

  return (
    <section className="section">
      <div className="container-sub">
        <div className="box-completed-booking">
          <div className="text-center wow fadeInUp">
            <img
              className="mb-20"
              src="/assets/imgs/page/booking/completed.png"
              alt="Booking Confirmation"
            />
            <h4 className="heading-24-medium color-text mb-10">
              {passengerInfo?.firstName}, your booking was submitted successfully!
            </h4>
            <p className="text-14 color-grey mb-40">
              Booking details have been sent to: {passengerInfo?.email}, and
              a representative will be in touch with you momentarily.
            </p>
          </div>
          {/* Display Booking Details */}
          <div className="booking-details">
            <h5 className="mb-20">Booking Invoice</h5>
            <table className="invoice-table">
              <tbody>
                <tr>
                  <td>
                    <strong>Order Number:</strong>
                  </td>
                  <td>#{orderNumber}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Date:</strong>
                  </td>
                  <td>{new Date().toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Passenger Name:</strong>
                  </td>
                  <td>
                    {passengerInfo?.firstName} {passengerInfo?.lastName}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Phone Number:</strong>
                  </td>
                  <td>{passengerInfo?.phone}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email:</strong>
                  </td>
                  <td>{passengerInfo?.email}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Trip Type:</strong>
                  </td>
                  <td>{tripType}</td>
                </tr>
                {tripType === "Hourly" && (
                  <tr>
                    <td>
                      <strong>Number of Hours:</strong>
                    </td>
                    <td>{numberOfHours}</td>
                  </tr>
                )}
                {tripType === "Airport Pickup" && passengerInfo?.flightNumber && (
                  <tr>
                    <td>
                      <strong>Flight Number:</strong>
                    </td>
                    <td>{passengerInfo.flightNumber}</td>
                  </tr>
                )}
                <tr>
                  <td>
                    <strong>Pick Up Address:</strong>
                  </td>
                  <td>{fromAddress}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Drop Off Address:</strong>
                  </td>
                  <td>{toAddress}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Pick Up Date:</strong>
                  </td>
                  <td>
                    {date ? new Date(date).toLocaleDateString() : ""}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Pick Up Time:</strong>
                  </td>
                  <td>
                    {time ? new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Vehicle:</strong>
                  </td>
                  <td>{vehicle?.title}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Distance:</strong>
                  </td>
                  <td>{distanceText}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Estimated Duration:</strong>
                  </td>
                  <td>{durationText}</td>
                </tr>
                {/* Note to Driver */}
                {passengerInfo?.notes && (
                  <tr>
                    <td>
                      <strong>Note to Driver:</strong>
                    </td>
                    <td>{passengerInfo.notes}</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Price Breakdown */}
            <h6 className="text-16-medium color-text mb-10 mt-30">
              Price Breakdown
            </h6>
            <table className="invoice-table">
              <tbody>
                <tr>
                  <td>Base Price:</td>
                  <td>${bookingData.basePrice}</td>
                </tr>
                {passengerInfo.carSeatCount > 0 && (
                  <tr>
                    <td>
                      Car Seats ({passengerInfo.carSeatCount} x $25):
                    </td>
                    <td>${bookingData.carSeatCharge}</td>
                  </tr>
                )}
                <tr>
                  <td>Gratuity ({gratuityPercentage}%):</td>
                  <td>${bookingData.gratuityAmount}</td>
                </tr>
                <tr className="font-weight-bold">
                  <td>Total Price:</td>
                  <td>${bookingData.totalPrice}</td>
                </tr>
              </tbody>
            </table>

            <p className="mt-15">
              Status: <strong>Paid</strong>
            </p>
          </div>

          {/* Display Map */}
          {directionsResponse && (
            <div className="mt-20">
              <GoogleMap
                mapContainerStyle={containerStyle}
                options={{
                  disableDefaultUI: true,
                }}
              >
                <DirectionsRenderer
                  directions={directionsResponse}
                  options={{
                    suppressMarkers: false,
                  }}
                />
              </GoogleMap>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
