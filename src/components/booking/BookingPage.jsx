// BookingPage.jsx

import React, { useState, useContext } from "react";
import BookingTab from "@/components/booking/BookingTab";
import PassengerDetails from "@/components/booking/PassengerDetails";
import BookingPayment from "@/components/booking/BookingPayment";
import BookingRecieved from "@/components/booking/BookingRecieved";
import SideBar from "@/components/booking/SideBar";
import { BookingContext } from "@/components/booking/BookingContext";
import BookingVehicles from "@/components/booking/BookingVehicles";
import { Routes, Route } from "react-router-dom";

export default function BookingPage() {
  const { bookingData, setBookingData } = useContext(BookingContext);

  const handleNextStep = () => {
    setBookingData((prev) => ({
      ...prev,
      currentStep: prev.currentStep + 1,
    }));
  };

  const handleBackStep = () => {
    setBookingData((prev) => ({
      ...prev,
      currentStep: prev.currentStep - 1,
    }));
  };

  const renderStepContent = () => {
    switch (bookingData.currentStep) {
      case 1:
        return <BookingVehicles onNext={handleNextStep} />;
      case 2:
        return (
          <PassengerDetails onNext={handleNextStep} onBack={handleBackStep} />
        );
      case 3:
        return (
          <BookingPayment onNext={handleNextStep} onBack={handleBackStep} />
        );
      case 4:
        return <BookingRecieved />;
      default:
        return <BookingVehicles onNext={handleNextStep} />;
    }
  };

  return (
    <section className="section">
      <div className="container-sub">
        <BookingTab
          currentStep={bookingData.currentStep}
          setCurrentStep={(step) => setBookingData((prev) => ({ ...prev, currentStep: step }))}
          highestStep={bookingData.highestStep}
        />
        <div className="box-row-tab mt-50" style={{ display: "flex", alignItems: "flex-start" }}>
          <div className="box-tab-left">
            <div className="box-content-detail">
              {renderStepContent()}
            </div>
          </div>
          <SideBar />
        </div>
      </div>
    </section>
  );
}
