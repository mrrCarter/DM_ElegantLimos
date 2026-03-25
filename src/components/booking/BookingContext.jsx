import { createContext, useEffect, useState } from "react";

import {
  DEFAULT_BOOKING_DATA,
  loadBookingData,
  normalizeBookingData,
  persistBookingData,
} from "@/lib/booking";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingState] = useState(() => loadBookingData());

  useEffect(() => {
    persistBookingData(bookingData);
  }, [bookingData]);

  const setBookingData = (updater) => {
    setBookingState((previousState) => {
      const nextState =
        typeof updater === "function" ? updater(previousState) : updater;

      return normalizeBookingData(nextState);
    });
  };

  const resetBookingData = () => {
    setBookingState(DEFAULT_BOOKING_DATA);
  };

  return (
    <BookingContext.Provider
      value={{ bookingData, setBookingData, resetBookingData }}
    >
      {children}
    </BookingContext.Provider>
  );
};
