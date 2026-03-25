// Hero.jsx

import { useContext, useState } from "react";
import DatePickerComponent from "@/components/common/DatePicker";
import PlacePicker from "@/components/common/PlacePicker";
import TimePickerComponent from "@/components/common/TimePicker";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "@/components/booking/BookingContext";
import { TRIP_TYPES } from "@/lib/booking";

const banners = [
  {
    id: 1,
    url: "/assets/imgs/SUVlineup.webp",
    eyebrow: "Airport Transfers",
    title: "Boston black car service that lands as smoothly as your itinerary.",
    description:
      "Reserve Logan pickups, downtown drop-offs, and executive transfers with a booking flow built for polished arrivals.",
    badges: ["Meet-and-greet ready", "Flight-aware timing", "Professional chauffeurs"],
  },
  {
    id: 2,
    url: "/assets/imgs/luxurySedans.webp",
    eyebrow: "Hourly Chauffeur",
    title: "Sedans and SUVs for boardrooms, celebrations, and every stop between.",
    description:
      "Book premium hourly coverage when the schedule is fluid but the service still needs to feel exact.",
    badges: ["Flexible hourly blocks", "Luxury sedan + SUV fleet", "Client-ready presentation"],
  },
  {
    id: 3,
    url: "/assets/imgs/page/homepage1/hero-banner4.jpg",
    eyebrow: "Special Events",
    title: "Premium rides that hold up when the guest list matters.",
    description:
      "From corporate dinners to milestone nights, deliver a calm, elevated arrival experience for every passenger.",
    badges: ["Transparent pricing", "Direct dispatch support", "Luxury event transport"],
  },
];

export default function Hero() {
  const settings = {
    slidesPerView: 1,
    slidesPerGroup: 1,
    loop: true,
    navigation: {
      nextEl: ".snbn2",
      prevEl: ".snbp2",
    },
    modules: [Navigation, Autoplay, Pagination],
    pagination: {
      el: ".sph1",
      clickable: true,
      type: "fraction",
    },
    autoplay: {
      delay: 10000,
    },
  };

  const navigate = useNavigate();
  const { setBookingData } = useContext(BookingContext);

  // Initialize date and time as JavaScript Date objects
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(
    new Date(Date.now() + 2 * 60 * 60 * 1000) // Current time + 2 hours
  );

  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [tripType, setTripType] = useState("Point-to-Point");

  // Validation states
  const [errors, setErrors] = useState({});

  // Function to handle the Search button click
  const handleSearchClick = () => {
    // Additional validation before navigation
    let validationErrors = {};

    if (!date) validationErrors.date = "Please select a date.";
    if (!time) validationErrors.time = "Please select a time.";
    if (!fromAddress)
      validationErrors.fromAddress = "Please enter a pickup location.";
    if (!toAddress)
      validationErrors.toAddress = "Please enter a drop-off location.";

    setErrors(validationErrors);

    // If there are no validation errors, proceed
    if (Object.keys(validationErrors).length === 0) {
      // Store the initial booking data in context
      setBookingData((prev) => ({
        ...prev,
        date: date.toISOString(),
        time: time.toISOString(),
        fromAddress,
        toAddress,
        tripType,
        vehicle: null,
        cardLast4Digits: null,
        paymentIntentId: null,
        orderNumber: null,
        currentStep: 1,
        highestStep: 1,
      }));

      navigate("/booking");
    }
  };

  // Form validation - check if all required fields are filled
  const isFormValid = date && time && fromAddress && toAddress;

  return (
    <section className="section banner-home1 premium-hero">
      <div className="box-swiper">
        <Swiper
          style={{ maxWidth: "100vw", overflow: "hidden" }}
          {...settings}
          className="swiper-container swiper-banner-1 pb-0"
        >
          {banners.map((elm, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <div
                className="box-cover-image boxBgImage premium-hero-slide"
                style={{
                  backgroundImage: `url(${elm.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "540px",
                  width: "100%",
                  maxWidth: "1920px",
                  margin: "0 auto",
                }}
              >
                <div className="premium-hero-overlay"></div>
              </div>
              <div className="box-banner-info premium-hero-copy">
                <p className="premium-section-eyebrow wow fadeInUp">
                  {elm.eyebrow}
                </p>
                <h1 className="premium-hero-title wow fadeInUp">{elm.title}</h1>
                <p className="premium-hero-description wow fadeInUp">
                  {elm.description}
                </p>
                <div className="premium-hero-badges wow fadeInUp">
                  {elm.badges.map((badge) => (
                    <span key={badge} className="premium-hero-badge">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="box-pagination-button hero1nagigation">
            <div className="swiper-button-prev swiper-button-prev-banner snbp2"></div>
            <div className="swiper-button-next swiper-button-next-banner snbn2"></div>
            <div className="swiper-pagination swiper-pagination-banner sph1"></div>
          </div>
        </Swiper>
      </div>
      <div className="box-search-ride wow fadeInUp premium-search-card">
        <div className="premium-search-intro">
          <p className="premium-section-eyebrow">Plan Your Ride</p>
          <h2>Get a polished quote before you ever step curbside.</h2>
          <p>
            Choose the route, lock the trip type, and move straight into vehicle
            selection with transparent pricing.
          </p>
        </div>
        <div className="search-item search-date">
          <div className="search-icon">
            <span className="item-icon icon-date"> </span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey">Date</label>
            <DatePickerComponent value={date} onChange={setDate} />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>
        </div>
        <div className="search-item search-time">
          <div className="search-icon">
            <span className="item-icon icon-time"> </span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey">Time</label>
            <TimePickerComponent value={time} onChange={setTime} />
            {errors.time && <span className="error-text">{errors.time}</span>}
          </div>
        </div>
        <div className="search-item search-from">
          <div className="search-icon">
            <span className="item-icon icon-from"> </span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey">From</label>
            <PlacePicker
              value={fromAddress}
              onChange={setFromAddress}
              inputStyle={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            {errors.fromAddress && (
              <span className="error-text">{errors.fromAddress}</span>
            )}
          </div>
        </div>
        <div className="search-item search-to">
          <div className="search-icon">
            <span className="item-icon icon-to"> </span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey">To</label>
            <PlacePicker
              value={toAddress}
              onChange={setToAddress}
              inputStyle={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            {errors.toAddress && (
              <span className="error-text">{errors.toAddress}</span>
            )}
          </div>
        </div>
        <div className="search-item search-trip-type">
          <div className="search-inputs">
            <label className="text-14 color-grey">Trip Type</label>
            <select
              className="form-control"
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
              }}
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
            >
              {TRIP_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="search-item search-button">
          <button
            className="btn btn-search"
            type="button"
            onClick={handleSearchClick}
            disabled={!isFormValid}
          >
            <img
              src="/assets/imgs/template/icons/search.svg"
              alt="dmelegantlimos"
            />
            Check Availability
          </button>
        </div>
      </div>
      <div className="premium-hero-metrics">
        <div className="premium-metric-card">
          <span>Coverage</span>
          <strong>Logan, Seaport, Back Bay, Cambridge, and Greater Boston</strong>
        </div>
        <div className="premium-metric-card">
          <span>Service Modes</span>
          <strong>Airport transfers, hourly chauffeur, point-to-point, events</strong>
        </div>
        <div className="premium-metric-card">
          <span>Experience</span>
          <strong>Luxury sedans and SUVs with direct dispatch support</strong>
        </div>
      </div>
    </section>
  );
}
