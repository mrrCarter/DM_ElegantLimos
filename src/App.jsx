// App.jsx

import React, { useEffect } from "react";
import "./styles/style.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages";

import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import AboutPage1 from "./pages/pages/about";
import AboutPage2 from "./pages/pages/about-2";
import ContactPage1 from "./pages/pages/contact";
import ContactPage2 from "./pages/pages/contact-2";
import OurTeamPage from "./pages/pages/our-team";
import TeamSinglePage from "./pages/pages/team-single";
import LoginPage from "./pages/pages/login";
import RegisterPage from "./pages/pages/register";
import PricingPage from "./pages/pages/pricing";
import CommingSoonPage from "./pages/pages/coming-soon";
import PageNotFoundPage from "./pages/page-not-found";
import BookingVehiclePage from "./pages/booking/booking-vehicle";
import BookingExtraPage from "./pages/booking/booking-extra";
import BookingPassengerPage from "./pages/booking/booking-passenger";
import BookingPaymentPage from "./pages/booking/booking-payment";
import InvoicePage from "./pages/invoice";
import FleetListPage1 from "./pages/fleets/fleet-list";
import FleetListPage2 from "./pages/fleets/fleet-list-2";
import FleetListPage3 from "./pages/fleets/fleet-list-3";
import FleetListPage4 from "./pages/fleets/fleet-list-4";
import FleetSinglePage from "./pages/fleets/fleet-single";
import ServiceGridPage1 from "./pages/services/service-grid";
import ServiceGridPage2 from "./pages/services/service-grid-2";
import ServiceGridPage3 from "./pages/services/service-grid-3";
import ServiceSinglePage from "./pages/services/service-single";
import BlogsGridPage1 from "./pages/blogs/blog-grid";
import BlogsGridPage2 from "./pages/blogs/blog-grid-2";
import BlogsListPage from "./pages/blogs/blog-list";
import BlogsSinglePage from "./pages/blogs/blog-single";
import BookingRecevedPage from "./pages/booking/booking-receved"; 
import BookingPage from "./pages/booking-page";
import WOW from "wow.js";
import { BookingProvider } from "./components/booking/BookingContext";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported
      });
    }
  }, []);

  useEffect(() => {
    new WOW({
      live: false,
    }).init();
  }, [pathname]);

  return (
    <BookingProvider>
      <WhatsAppFloatingButton />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />


            <Route path="contact" element={<ContactPage1 />} />
            <Route path="booking-receved" element={<BookingRecevedPage />} />
            <Route path="invoice" element={<InvoicePage />} />

            <Route path="fleet-list" element={<FleetListPage1 />} />

            {/* Update the parent route with trailing '*' to handle nested routes */}
            <Route path="booking/*" element={<BookingPage />} />

            {/* Wildcard route for 404 Not Found */}
            <Route path="*" element={<PageNotFoundPage />} />
          </Route>
        </Routes>
      <ScrollTopBehaviour />
    </BookingProvider>
  );
}

export default App;
