// BookingContext.jsx

import React, { createContext, useState, useEffect } from "react";

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
      phone: "",
    },
    vehicle: null,
    price: null,
    distanceValue: null,
    durationValue: null,
    directionsResponse: null,
    selectedExtras: null,
    cardLast4Digits: null,
    gratuityPercentage: 20,
    totalPrice: null,
    currentStep: 1,
  });

  useEffect(() => {
    const basePrice = parseFloat(bookingData.price) || 0;
    const gratuityPercent = bookingData.gratuityPercentage || 0;

    const gratuityAmount = (gratuityPercent / 100) * basePrice;
    const total = basePrice + gratuityAmount;

    setBookingData((prev) => ({
      ...prev,
      totalPrice: total.toFixed(2),
    }));
  }, [bookingData.price, bookingData.gratuityPercentage]);

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};
