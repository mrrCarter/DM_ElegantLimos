// BookingReceived.jsx

import React, { useEffect, useContext } from "react";
import { BookingContext } from "./BookingContext";
import emailjs from 'emailjs-com';
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

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
    directionsResponse,
    passengerInfo,
    vehicle,
    price,
    gratuityPercentage,
    totalPrice,
    cardLast4Digits,
    distanceText,
    durationText,
  } = bookingData;

  useEffect(() => {
    if (!bookingData || !bookingData.passengerInfo || !bookingData.price) {
      // Redirect to the booking start page
      navigate("/booking");
    }
    // Construct the email content
    const templateParams = {
      to_email: passengerInfo?.email || 'info@yourcompany.com',
      order_number: '#4039', // Generate or fetch a real order number
      date: new Date().toLocaleDateString(),
      fromAddress,
      toAddress,
      date: date ? new Date(date).toLocaleDateString() : '',
      time: time ? new Date(time).toLocaleTimeString() : '',
      first_name: passengerInfo?.firstName || '',
      last_name: passengerInfo?.lastName || '',
      email: passengerInfo?.email || '',
      phone: passengerInfo?.phoneNumber || '',
      vehicle: vehicle?.title || '',
      base_price: parseFloat(price).toFixed(2),
      gratuity_percentage: gratuityPercentage,
      total_price: totalPrice,
      distance: distanceText,
      duration: durationText,
      status: 'Paid',
    };

    // Send email to client
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        console.log('Email sent to client successfully!', response.status, response.text);
      }, (error) => {
        console.error('Failed to send email to client:', error);
      });

    // Send email to company
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { ...templateParams, to_email: 'info@yourcompany.com' }, 'YOUR_USER_ID')
      .then((response) => {
        console.log('Email sent to company successfully!', response.status, response.text);
      }, (error) => {
        console.error('Failed to send email to company:', error);
      });
  }, [bookingData, navigate]);

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
              Booking details have been sent to: {passengerInfo?.email}, and a representative will be with you momentarily.
            </p>
          </div>
          {/* Display Booking Details */}
          <div className="booking-details">
            <h5 className="mb-20">Booking Invoice</h5>
            <table className="invoice-table">
              <tbody>
                <tr>
                  <td><strong>Order Number:</strong></td>
                  <td>#4039</td>
                </tr>
                <tr>
                  <td><strong>Date:</strong></td>
                  <td>{new Date().toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td><strong>Passenger Name:</strong></td>
                  <td>{passengerInfo?.firstName} {passengerInfo?.lastName}</td>
                </tr>
                <tr>
                  <td><strong>Phone Number:</strong></td>
                  <td>{passengerInfo?.phoneNumber}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{passengerInfo?.email}</td>
                </tr>
                <tr>
                  <td><strong>Pick Up Address:</strong></td>
                  <td>{fromAddress}</td>
                </tr>
                <tr>
                  <td><strong>Drop Off Address:</strong></td>
                  <td>{toAddress}</td>
                </tr>
                <tr>
                  <td><strong>Pick Up Date:</strong></td>
                  <td>{date ? new Date(date).toLocaleDateString() : ''}</td>
                </tr>
                <tr>
                  <td><strong>Pick Up Time:</strong></td>
                  <td>{time ? new Date(time).toLocaleTimeString() : ''}</td>
                </tr>
                <tr>
                  <td><strong>Vehicle:</strong></td>
                  <td>{vehicle?.title}</td>
                </tr>
                <tr>
                  <td><strong>Distance:</strong></td>
                  <td>{distanceText}</td>
                </tr>
                <tr>
                  <td><strong>Estimated Duration:</strong></td>
                  <td>{durationText}</td>
                </tr>
              </tbody>
            </table>

            {/* Price Breakdown */}
            <h6 className="text-16-medium color-text mb-10 mt-30">Price Breakdown</h6>
            <table className="invoice-table">
              <tbody>
                <tr>
                  <td>Base Price:</td>
                  <td>${parseFloat(price).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Gratuity ({gratuityPercentage}%):</td>
                  <td>
                    ${(
                      (gratuityPercentage / 100) *
                      parseFloat(price)
                    ).toFixed(2)}
                  </td>
                </tr>
                <tr className="font-weight-bold">
                  <td>Total Price:</td>
                  <td>${totalPrice}</td>
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
