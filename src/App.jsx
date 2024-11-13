// App.jsx

import { useEffect } from "react";
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

import { LoadScript } from "@react-google-maps/api"; // Import LoadScript

const libraries = ["places"];

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
    <LoadScript
      googleMapsApiKey="AIzaSyAU4OiURduvgpZfhLSJVy2Ga2xjJcwVTAg" // Replace with your API key
      libraries={libraries}
      loadingElement={<div>Loading Maps...</div>}
    >
      <>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />

            <Route path="about" element={<AboutPage1 />} />
            <Route path="about-2" element={<AboutPage2 />} />
            <Route path="contact" element={<ContactPage1 />} />
            <Route path="contact-2" element={<ContactPage2 />} />
            <Route path="our-team" element={<OurTeamPage />} />
            <Route path="team-single/:id" element={<TeamSinglePage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="coming-soon" element={<CommingSoonPage />} />
            <Route path="page-not-found" element={<PageNotFoundPage />} />
            <Route path="booking-vehicle" element={<BookingVehiclePage />} />
            <Route path="booking-extra" element={<BookingExtraPage />} />
            <Route path="booking-passenger" element={<BookingPassengerPage />} />
            <Route path="booking-payment" element={<BookingPaymentPage />} />
            <Route path="booking-receved" element={<BookingRecevedPage />} />
            <Route path="invoice" element={<InvoicePage />} />

            <Route path="fleet-list" element={<FleetListPage1 />} />
            <Route path="fleet-list-2" element={<FleetListPage2 />} />
            <Route path="fleet-list-3" element={<FleetListPage3 />} />
            <Route path="fleet-list-4" element={<FleetListPage4 />} />
            <Route path="fleet-single/:id" element={<FleetSinglePage />} />

            <Route path="service-grid" element={<ServiceGridPage1 />} />
            <Route path="service-grid-2" element={<ServiceGridPage2 />} />
            <Route path="service-grid-3" element={<ServiceGridPage3 />} />
            <Route path="service-single/:id" element={<ServiceSinglePage />} />

            <Route path="blog-grid" element={<BlogsGridPage1 />} />
            <Route path="blog-grid-2" element={<BlogsGridPage2 />} />
            <Route path="blog-list" element={<BlogsListPage />} />
            <Route path="blog-single/:id" element={<BlogsSinglePage />} />
            <Route path="booking" element={<BookingPage />} />

            <Route path="*" element={<PageNotFoundPage />} />
          </Route>
        </Routes>
        <ScrollTopBehaviour />
      </>
      </LoadScript>
    </BookingProvider>
  );
}

export default App;
