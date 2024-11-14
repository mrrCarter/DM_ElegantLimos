// BookingTab.jsx

import React from "react";

const tabs = [
  {
    id: 1,
    iconClass: "icon-book icon-vehicle",
    text: "Vehicle",
    number: "01",
  },
  {
    id: 2,
    iconClass: "icon-book icon-pax",
    text: "Details",
    number: "02",
  },
  {
    id: 3,
    iconClass: "icon-book icon-payment",
    text: "Payment",
    number: "03",
  },
];

export default function BookingTab({ currentStep, setCurrentStep, highestStep }) {
  const handleTabClick = (step) => {
    if (step <= highestStep) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="box-booking-tabs">
      {tabs.map((elm) => (
        <div key={elm.id} className="item-tab wow fadeInUp">
          <div
            className={`box-tab-step ${
              currentStep === elm.id ? "active" : ""
            } ${highestStep >= elm.id ? "" : "disabled"}`}
            onClick={() => handleTabClick(elm.id)}
            style={{
              cursor: highestStep >= elm.id ? "pointer" : "not-allowed",
            }}
          >
            <div className="icon-tab">
              <span className={elm.iconClass}> </span>
              <span className="text-tab">{elm.text} </span>
            </div>
            <div className="number-tab">
              <span>{elm.number}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
