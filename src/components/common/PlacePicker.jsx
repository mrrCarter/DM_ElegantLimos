// PlacePicker.jsx

import { useEffect, useId, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import axios from "axios";

const GEOCODE_REQUEST_TIMEOUT_MS = 10000;

export default function PlacePicker({
  id,
  label,
  name,
  value,
  onChange,
  inputStyle,
  ariaDescribedBy,
}) {
  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState(value ?? "");
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputLabel = label || "Enter a location";
  const hasGoogleMaps =
    typeof window !== "undefined" && Boolean(window.google?.maps?.places);

  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const formattedAddress = place.formatted_address || place.name;
      setInputValue(formattedAddress ?? "");
      if (onChange) onChange(formattedAddress);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const handleCurrentLocationClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`,
              {
                timeout: GEOCODE_REQUEST_TIMEOUT_MS,
              }
            );
            const address = response.data.results[0]?.formatted_address;
            if (address) {
              setInputValue(address);
              if (onChange) onChange(address);
            }
          } catch (error) {
            console.error("Error fetching address from coordinates:", error);
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={handleCurrentLocationClick}
          aria-label={`Use current location for ${inputLabel.toLowerCase()}`}
          style={{
            textDecoration: "underline",
            color: "var(--premium-accent)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "5px 0",
            fontSize: "12px",
            whiteSpace: "nowrap",
          }}
        >
          Use Current Location
        </button>
      </div>
      {hasGoogleMaps ? (
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            id={inputId}
            name={name ?? inputId}
            type="text"
            className="form-control"
            placeholder={inputLabel}
            value={inputValue}
            onChange={(event) => {
              const nextValue = event.target.value;
              setInputValue(nextValue);
              if (onChange) onChange(nextValue);
            }}
            aria-label={inputLabel}
            aria-describedby={ariaDescribedBy}
            autoComplete="street-address"
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid #ccc",
              fontSize: "18px",
              padding: "10px 0",
              color: "#000",
              backgroundColor: "transparent",
              ...inputStyle,
            }}
          />
        </Autocomplete>
      ) : (
        <input
          id={inputId}
          name={name ?? inputId}
          type="text"
          className="form-control"
          placeholder={inputLabel}
          value={inputValue}
          onChange={(event) => {
            const nextValue = event.target.value;
            setInputValue(nextValue);
            if (onChange) onChange(nextValue);
          }}
          aria-label={inputLabel}
          aria-describedby={ariaDescribedBy}
          autoComplete="street-address"
          style={{
            width: "100%",
            border: "none",
            borderBottom: "1px solid #ccc",
            fontSize: "18px",
            padding: "10px 0",
            color: "#000",
            backgroundColor: "transparent",
            ...inputStyle,
          }}
        />
      )}
    </div>
  );
}
