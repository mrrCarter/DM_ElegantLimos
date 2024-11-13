// pages/booking-page/index.jsx

import React, { useState } from "react";
import BookingTab from "@/components/booking/BookingTab";
import BookingVehicle from "@/components/booking/BookingVehicles";
import BookingExtra from "@/components/booking/BookingExtra";
import PassengerDetails from "@/components/booking/PassengerDetails";
import BookingPayment from "@/components/booking/BookingPayment";
import SideBar from "@/components/booking/SideBar";

import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Booking || DM Elegant Limousine Chauffeur Service",
  description: "Book your ride with DM Elegant Limousine.",
};

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BookingVehicle onNext={() => setCurrentStep(2)} />;
      case 2:
        return (
          <BookingExtra
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <PassengerDetails
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <BookingPayment
            onBack={() => setCurrentStep(3)}
            onPaymentSuccess={() => setCurrentStep(5)}
          />
        );
      case 5:
        return <BookingReceived />;
      default:
        return <BookingVehicle onNext={() => setCurrentStep(2)} />;
    }
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <MobailHeader1 />
      <main className="main">
        <section className="section">
          <div className="container-sub">
            <BookingTab currentStep={currentStep} setCurrentStep={setCurrentStep} />
            <div className="booking-page">
              <div className="booking-content">{renderStepContent()}</div>
              <SideBar />
            </div>
          </div>
        </section>
      </main>
      <Footer1 />
    </>
  );
}
