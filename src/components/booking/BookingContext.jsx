// BookingContext.jsx

import React, { createContext, useState, useEffect } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    tripType: "Point-to-Point",
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
      notes: "",
      carSeatCount: 0,
      flightNumber: "",
    },
    vehicle: null,
    price: null,
    basePrice: 0,
    gratuityAmount: 0,
    numberOfHours: 3,
    distanceValue: null,
    durationValue: null,
    directionsResponse: null,
    selectedExtras: null,
    cardLast4Digits: null,
    gratuityPercentage: 20,
    totalPrice: 0,
    currentStep: 1,
  });

  useEffect(() => {
    calculateTotalPrice();
  }, [
    bookingData.price,
    bookingData.gratuityPercentage,
    bookingData.tripType,
    bookingData.numberOfHours,
    bookingData.passengerInfo.carSeatCount,
    bookingData.vehicle,
    bookingData.passengerInfo,
  ]);

  const calculateTotalPrice = () => {
    let basePrice = parseFloat(bookingData.price) || 0;
  
    if (bookingData.tripType === "Hourly" && bookingData.vehicle) {
      const hourlyRate =
        bookingData.vehicle.title === "SUV Class" ? 120 : 95;
      basePrice = hourlyRate * bookingData.numberOfHours;
    }
  
    const carSeatCharge = (bookingData.passengerInfo.carSeatCount || 0) * 25;
    basePrice += carSeatCharge;
  
    const gratuityPercent = bookingData.gratuityPercentage || 0;
    const gratuityAmount = (gratuityPercent / 100) * basePrice;
    const total = basePrice + gratuityAmount;
  
    setBookingData((prev) => ({
      ...prev,
      totalPrice: total.toFixed(2),
      price: basePrice.toFixed(2),
      basePrice: basePrice.toFixed(2), // Store base price separately
      carSeatCharge: carSeatCharge.toFixed(2),
      gratuityAmount: gratuityAmount.toFixed(2),
    }));
  };

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};
