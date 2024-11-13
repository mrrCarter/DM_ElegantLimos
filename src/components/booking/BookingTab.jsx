import React from "react";

export default function BookingTab({ currentStep, setCurrentStep }) {
  const steps = [
    { step: 1, label: "Vehicle" },
    { step: 2, label: "Passenger" },
    { step: 3, label: "Payment" },
  ];

  const handleStepClick = (step) => {
    // Allow navigation to previous steps or the current step
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="box-booking-tabs">
      {steps.map(({ step, label }, index) => (
        <div key={step} className="item-tab wow fadeInUp">
          <div
            className={`box-tab-step ${currentStep >= step ? "active" : ""} ${
              step > currentStep ? "disabled" : ""
            }`}
            onClick={() => handleStepClick(step)}
            style={{ cursor: step <= currentStep ? "pointer" : "not-allowed" }}
          >
            <div className="icon-tab">
              <span
                className={
                  step === 1
                    ? "icon-book icon-vehicle"
                    : step === 2
                    ? "icon-book icon-pax"
                    : "icon-book icon-payment"
                }
              > </span>
              <span className="text-tab">{label} </span>
            </div>
            <div className="number-tab">
              <span>0{step}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
