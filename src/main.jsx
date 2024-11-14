import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import emailjs from "emailjs-com";
import { LoadScript } from "@react-google-maps/api";

// Initialize EmailJS outside of the component to prevent re-initialization
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// Define libraries and loading element as constants outside the component
const GOOGLE_MAPS_LIBRARIES = ["places"];
const GOOGLE_MAPS_LOADING_ELEMENT = <div>Loading Maps...</div>;
console.log("EmailJS Public Key:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
console.log("GOOGLE_MAPS_API_KEY:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={GOOGLE_MAPS_LIBRARIES}
      loadingElement={GOOGLE_MAPS_LOADING_ELEMENT}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoadScript>
  </React.StrictMode>
);
