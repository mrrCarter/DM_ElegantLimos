// BookingPage.jsx

import { useContext } from "react";
import BookingTab from "@/components/booking/BookingTab";
import PassengerDetails from "@/components/booking/PassengerDetails";
import BookingPayment from "@/components/booking/BookingPayment";
import BookingRecieved from "@/components/booking/BookingRecieved";
import SideBar from "@/components/booking/SideBar";
import { BookingContext } from "@/components/booking/BookingContext";
import BookingVehicles from "@/components/booking/BookingVehicles";

export default function BookingPage() {
  const { bookingData, setBookingData } = useContext(BookingContext);

  const handleNextStep = () => {
    setBookingData((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 4),
      highestStep: Math.max(prev.highestStep, prev.currentStep + 1),
    }));
  };

  const handleBackStep = () => {
    setBookingData((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
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
    <section className="section booking-shell">
      <div className="container-sub booking-shell__container">
        <BookingTab
          currentStep={bookingData.currentStep}
          setCurrentStep={(step) => setBookingData((prev) => ({ ...prev, currentStep: step }))}
          highestStep={bookingData.highestStep}
        />
        <div
          className="box-row-tab mt-50 booking-shell__layout"
          style={{ display: "flex", alignItems: "flex-start" }}
        >
          <div className="box-tab-left booking-shell__main">
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
