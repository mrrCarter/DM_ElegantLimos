// App.jsx

import React, { useEffect } from "react";
import "./styles/style.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import ContactPage1 from "./pages/pages/contact";
import PageNotFoundPage from "./pages/page-not-found";
import InvoicePage from "./pages/invoice";
import FleetListPage1 from "./pages/fleets/fleet-list";
import BookingRecevedPage from "./pages/booking/booking-receved"; 
import BookingPage from "./pages/booking-page";
import WOW from "wow.js";
import { BookingProvider } from "./components/booking/BookingContext";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";
import Services from "./pages/services/service-single";
import Faq from './pages/FAQ';
import AboutPage1 from "./pages/pages/about";
import BlogListPage from "./pages/blogs/blog-single";
import RequestQuotePage from "./pages/pages/requestQuote";

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
          <Route path="service-grid" element={<Services />} />
          <Route path="booking/*" element={<BookingPage />} />
          <Route path="faq" element={<Faq />} />
          <Route path="about" element={<AboutPage1 />} />
          <Route path="blog-list" element={<BlogListPage />} />
          <Route path="request-a-quote" element={<RequestQuotePage />} />
          <Route path="*" element={<PageNotFoundPage />} />
        </Route>
      </Routes>
      <ScrollTopBehaviour />
    </BookingProvider>
  );
}

export default App;
