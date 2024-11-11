// DatePickerComponent.jsx

import React from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

export default function DatePickerComponent({ value, onChange }) {
  const handleDateChange = (newValue) => {
    if (newValue) {
      onChange(newValue.toDate());
    } else {
      onChange(null);
    }
  };

  return (
    <DatePicker
      format="MMMM DD YYYY"
      value={value ? new DateObject(value) : null}
      onChange={handleDateChange}
      placeholder="Select a date"
      style={{
        width: "100%",
        border: "none",
        borderBottom: "1px solid #ccc",
        fontSize: "16px",
        padding: "10px 0",
        color: "#000",
        backgroundColor: "transparent",
      }}
      containerStyle={{
        width: "100%",
      }}
      inputClass="custom-date-input"
    />
  );
}
