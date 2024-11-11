// PlacePicker.jsx

import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";

export default function PlacePicker({ label, value, onChange }) {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const formattedAddress = place.formatted_address || place.name;
      if (onChange) onChange(formattedAddress);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input
        type="text"
        className="form-control"
        placeholder={label || "Enter a location"}
        defaultValue={value}
        style={{
          width: "100%",
          border: "none",
          borderBottom: "1px solid #ccc",
          fontSize: "18px",
          padding: "10px 0",
          color: "#000",
          backgroundColor: "transparent",
        }}
      />
    </Autocomplete>
  );
}
