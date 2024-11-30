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
    baseFare: null,
    basePrice: null,
    numberOfHours: 3,
    distanceValue: null,
    durationValue: null,
    directionsResponse: null,
    selectedExtras: null,
    cardLast4Digits: null,
    gratuityPercentage: 20,
    gratuityAmount: null,
    carSeatCharge: null,
    totalPrice: null,
    currentStep: 1,
  });

  useEffect(() => {
    calculateTotalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    bookingData.baseFare,
    bookingData.gratuityPercentage,
    bookingData.tripType,
    bookingData.numberOfHours,
    bookingData.passengerInfo.carSeatCount,
    bookingData.vehicle,
  ]);

  const calculateTotalPrice = () => {
    let basePrice = 0;

    if (bookingData.vehicle) {
      if (bookingData.tripType === "Hourly") {
        const hourlyRate =
          bookingData.vehicle.type === "SUV" ? 115 : 105;
        const numberOfHours = Math.max(bookingData.numberOfHours || 0, 3);
        basePrice = hourlyRate * numberOfHours;
      } else {
        basePrice = parseFloat(bookingData.baseFare) || 0;
      }
    }

    const carSeatCharge = (bookingData.passengerInfo.carSeatCount || 0) * 25;

    const subtotal = basePrice + carSeatCharge;

    const gratuityPercent = bookingData.gratuityPercentage || 0;
    const gratuityAmount = (gratuityPercent / 100) * subtotal;

    const total = subtotal + gratuityAmount;

    setBookingData((prev) => ({
      ...prev,
      basePrice: basePrice.toFixed(2),
      carSeatCharge: carSeatCharge.toFixed(2),
      gratuityAmount: gratuityAmount.toFixed(2),
      totalPrice: total.toFixed(2),
    }));
  };

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};
