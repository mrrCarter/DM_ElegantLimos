// Hero.jsx

import React, { useState, useContext } from "react";
import DatePickerComponent from "@/components/common/DatePicker";
import PlacePicker from "@/components/common/PlacePicker";
import TimePickerComponent from "@/components/common/TimePicker";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "@/components/booking/BookingContext";

const banners = [
  {
    id: 1,
    url: "/assets/imgs/page/homepage1/hero-banner1.jpg",
    title: "Embark on an Unforgettable Journey",
    text: "Discover the World with Our Expert Guides",
  },
  {
    id: 2,
    url: "/assets/imgs/page/homepage1/hero-banner2.jpg",
    title: "Adventure Awaits",
    text: "Find Your Perfect Escape",
  },
  {
    id: 3,
    url: "/assets/imgs/page/homepage1/hero-banner3.jpg",
    title: "Luxury Redefined",
    text: "Travel in Style and Comfort",
  },
  {
    id: 4,
    url: "/assets/imgs/page/homepage1/hero-banner4.jpg",
    title: "Serenity at Its Best",
    text: "Relax in the World's Most Beautiful Locations",
  },
];

export default function Hero() {
  const settings = {
    slidesPerView: 1,
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
      }));

      navigate("/booking-vehicle");
    }
  };

  // Form validation - check if all required fields are filled
  const isFormValid = date && time && fromAddress && toAddress;

  return (
    <section className="section banner-home1">
      <div className="box-swiper">
        <Swiper
          style={{ maxWidth: "100vw", overflow: "hidden" }}
          {...settings}
          className="swiper-container swiper-banner-1 pb-0"
        >
          {banners.map((elm, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <div
                className="box-cover-image boxBgImage"
                style={{
                  backgroundImage: `url(${elm.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "350px",
                  width: "100%",
                  maxWidth: "1920px",
                  margin: "0 auto",
                }}
              ></div>
              <div className="box-banner-info">
                <p className="text-16 color-white wow fadeInUp">{elm.title}</p>
                <h2 className="heading-52-medium color-white wow fadeInUp">
                  {elm.text.split(" ").slice(0, 2).join(" ")}{" "}
                  <br className="d-none d-lg-block" />
                  {elm.text.split(" ").slice(2).join(" ")}
                </h2>
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
      <div className="box-search-ride wow fadeInUp">
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
            <PlacePicker value={fromAddress} onChange={setFromAddress} />
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
            <PlacePicker value={toAddress} onChange={setToAddress} />
            {errors.toAddress && (
              <span className="error-text">{errors.toAddress}</span>
            )}
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
              alt="luxride"
            />
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
