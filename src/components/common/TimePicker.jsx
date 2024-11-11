// TimePickerComponent.jsx

import React from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePickerPlugin from "react-multi-date-picker/plugins/time_picker";

export default function TimePickerComponent({ value, onChange }) {
  const handleTimeChange = (newValue) => {
    if (newValue) {
      onChange(newValue.toDate());
    } else {
      onChange(null);
    }
  };

  return (
    <DatePicker
      format="hh:mm A"
      value={value ? new DateObject(value) : null}
      onChange={handleTimeChange}
      plugins={[<TimePickerPlugin position="bottom" />]}
      disableDayPicker
      placeholder="Select time"
      style={{
        width: "100%",
        border: "none",
        borderBottom: "1px solid #ccc",
        fontSize: "18px",
        padding: "10px 0",
        color: "#000",
        backgroundColor: "transparent",
      }}
      containerStyle={{
        width: "100%",
      }}
      inputClass="custom-time-input"
      editable
    />
  );
}
