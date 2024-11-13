// BookingContext.jsx

import React, { createContext, useState } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    fromAddress: "",
    toAddress: "",
    date: null,
    time: null,
    passengerInfo: {
      passengers: 1,
      luggage: 0,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    vehicle: null,
    price: null,
    distanceValue: null,
    durationValue: null,
    directionsResponse: null,
    selectedExtras: null,
    cardLast4Digits: null,
    gratuityPercentage: 0,
    totalPrice: null,
  });

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};
