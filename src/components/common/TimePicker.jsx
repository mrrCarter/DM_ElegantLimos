// TimePickerComponent.jsx

import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePickerPlugin from "react-multi-date-picker/plugins/time_picker";

export default function TimePickerComponent({
  id,
  name,
  value,
  onChange,
  ariaLabel,
  placeholder = "Select time",
}) {
  const handleTimeChange = (newValue) => {
    if (newValue) {
      onChange(newValue.toDate());
    } else {
      onChange(null);
    }
  };

  return (
    <DatePicker
      id={id}
      name={name ?? id}
      aria-label={ariaLabel}
      format="hh:mm A"
      value={value ? new DateObject(value) : null}
      onChange={handleTimeChange}
      plugins={[<TimePickerPlugin key="time-picker" position="bottom" />]}
      disableDayPicker
      placeholder={placeholder}
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
