// PlacePicker.jsx

import { useEffect, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import axios from "axios";

export default function PlacePicker({ label, value, onChange, inputStyle }) {
  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState(value ?? "");
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
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
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
            type="text"
            className="form-control"
            placeholder={label || "Enter a location"}
            value={inputValue}
            onChange={(event) => {
              const nextValue = event.target.value;
              setInputValue(nextValue);
              if (onChange) onChange(nextValue);
            }}
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
          type="text"
          className="form-control"
          placeholder={label || "Enter a location"}
          value={inputValue}
          onChange={(event) => {
            const nextValue = event.target.value;
            setInputValue(nextValue);
            if (onChange) onChange(nextValue);
          }}
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
