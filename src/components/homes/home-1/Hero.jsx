import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import DatePickerComponent from "@/components/common/DatePicker";
import PlacePicker from "@/components/common/PlacePicker";
import TimePickerComponent from "@/components/common/TimePicker";
import { BookingContext } from "@/components/booking/BookingContext";
import { TRIP_TYPES } from "@/lib/booking";

const banners = [
  {
    id: 1,
    url: "/assets/imgs/SUVlineup.webp",
    eyebrow: "Airport Transfers",
    title: "Black car service for calm Logan arrivals.",
    description:
      "Reserve airport pickups, hotel transfers, and executive rides with polished vehicles and direct dispatch support.",
  },
  {
    id: 2,
    url: "/assets/imgs/luxurySedans.webp",
    eyebrow: "Hourly Chauffeur",
    title: "Hourly chauffeur coverage for multi-stop days.",
    description:
      "Choose hourly service when the itinerary keeps changing but the presentation still has to feel exact from first pickup to final stop.",
  },
  {
    id: 3,
    url: "/assets/imgs/page/homepage1/hero-banner4.jpg",
    eyebrow: "Events and Special Nights",
    title: "Event transportation that arrives polished.",
    description:
      "Handle weddings, VIP hosting, and milestone nights with premium transport built to feel smooth before, during, and after the event.",
  },
];

function formatTripTypeOptions(types) {
  if (types.length === 0) {
    return "other trip options";
  }

  if (types.length === 1) {
    return types[0];
  }

  if (types.length === 2) {
    return `${types[0]} or ${types[1]}`;
  }

  return `${types.slice(0, -1).join(", ")}, or ${types[types.length - 1]}`;
}

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
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date(Date.now() + 2 * 60 * 60 * 1000));
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [tripType, setTripType] = useState("Point-to-Point");
  const [errors, setErrors] = useState({});

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!date) validationErrors.date = "Please select a date.";
    if (!time) validationErrors.time = "Please select a time.";
    if (!fromAddress) {
      validationErrors.fromAddress = "Please enter a pickup location.";
    }
    if (!toAddress) {
      validationErrors.toAddress = "Please enter a drop-off location.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
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

  const hasErrors = Object.keys(errors).length > 0;
  const alternateTripTypes = TRIP_TYPES.filter((type) => type !== tripType);
  const tripTypeHelperText = `Change trip type here for ${formatTripTypeOptions(
    alternateTripTypes
  )}.`;

  return (
    <section className="section banner-home1 premium-hero" aria-labelledby="home-hero-title">
      <div className="box-swiper">
        <Swiper
          style={{ maxWidth: "100vw", overflow: "hidden" }}
          {...settings}
          className="swiper-container swiper-banner-1 pb-0"
        >
          {banners.map((banner, index) => {
            const HeadingTag = index === 0 ? "h1" : "h2";

            return (
              <SwiperSlide key={banner.id} className="swiper-slide">
                <div
                  className="box-cover-image boxBgImage premium-hero-slide"
                  style={{
                    backgroundImage: `url(${banner.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    maxWidth: "1920px",
                    margin: "0 auto",
                  }}
                ></div>
                <div className="box-banner-info premium-hero-copy">
                  <div className="premium-hero-copy-shell">
                    <p className="premium-section-eyebrow wow fadeInUp">
                      {banner.eyebrow}
                    </p>
                    <HeadingTag
                      id={index === 0 ? "home-hero-title" : undefined}
                      className="premium-hero-title wow fadeInUp"
                    >
                      {banner.title}
                    </HeadingTag>
                    <p className="premium-hero-description wow fadeInUp">
                      {banner.description}
                    </p>
                    <div className="premium-hero-actions wow fadeInUp">
                      <Link className="btn btn-primary" to="/booking">
                        Reserve a Ride
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}

          <div className="box-pagination-button hero1nagigation">
            <div className="swiper-button-prev swiper-button-prev-banner snbp2"></div>
            <div className="swiper-button-next swiper-button-next-banner snbn2"></div>
            <div className="swiper-pagination swiper-pagination-banner sph1"></div>
          </div>
        </Swiper>
      </div>

      <form className="box-search-ride premium-search-ride wow fadeInUp" onSubmit={handleSearchSubmit} noValidate>
        {hasErrors && (
          <div className="premium-form-alert" role="alert">
            Review the highlighted booking fields before continuing.
          </div>
        )}

        <div className="search-item search-date">
          <div className="search-icon">
            <span className="item-icon icon-date"></span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey" htmlFor="hero-trip-date">
              Date
            </label>
            <DatePickerComponent
              id="hero-trip-date"
              name="trip-date"
              value={date}
              onChange={setDate}
              ariaLabel="Trip date"
            />
            {errors.date && (
              <span id="hero-trip-date-error" className="error-text" role="alert">
                {errors.date}
              </span>
            )}
          </div>
        </div>

        <div className="search-item search-time">
          <div className="search-icon">
            <span className="item-icon icon-time"></span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey" htmlFor="hero-trip-time">
              Time
            </label>
            <TimePickerComponent
              id="hero-trip-time"
              name="trip-time"
              value={time}
              onChange={setTime}
              ariaLabel="Trip time"
            />
            {errors.time && (
              <span id="hero-trip-time-error" className="error-text" role="alert">
                {errors.time}
              </span>
            )}
          </div>
        </div>

        <div className="search-item search-from">
          <div className="search-icon">
            <span className="item-icon icon-from"></span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey" htmlFor="hero-trip-from">
              Pickup
            </label>
            <PlacePicker
              id="hero-trip-from"
              name="trip-from"
              label="Enter pickup location"
              value={fromAddress}
              onChange={setFromAddress}
              ariaDescribedBy={errors.fromAddress ? "hero-trip-from-error" : undefined}
              inputStyle={{
                width: "100%",
                padding: "10px 0",
                borderRadius: "0",
                border: "none",
                borderBottom: "1px solid #ccc",
              }}
            />
            {errors.fromAddress && (
              <span id="hero-trip-from-error" className="error-text" role="alert">
                {errors.fromAddress}
              </span>
            )}
          </div>
        </div>

        <div className="search-item search-to">
          <div className="search-icon">
            <span className="item-icon icon-to"></span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey" htmlFor="hero-trip-to">
              Drop-off
            </label>
            <PlacePicker
              id="hero-trip-to"
              name="trip-to"
              label="Enter destination"
              value={toAddress}
              onChange={setToAddress}
              ariaDescribedBy={errors.toAddress ? "hero-trip-to-error" : undefined}
              inputStyle={{
                width: "100%",
                padding: "10px 0",
                borderRadius: "0",
                border: "none",
                borderBottom: "1px solid #ccc",
              }}
            />
            {errors.toAddress && (
              <span id="hero-trip-to-error" className="error-text" role="alert">
                {errors.toAddress}
              </span>
            )}
          </div>
        </div>

        <div className="search-item search-trip-type">
          <div className="search-icon">
            <span className="item-icon premium-trip-icon" aria-hidden="true"></span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey" htmlFor="hero-trip-type">
              Trip Type
            </label>
            <div className="premium-select-shell premium-select-shell--trip-type">
              <select
                id="hero-trip-type"
                name="trip-type"
                className="form-control premium-select-input"
                value={tripType}
                onChange={(event) => setTripType(event.target.value)}
                aria-describedby="hero-trip-type-help hero-trip-type-help-mobile"
              >
                {TRIP_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <span id="hero-trip-type-help" className="premium-sr-only">
              {tripTypeHelperText}
            </span>
            <p id="hero-trip-type-help-mobile" className="premium-select-helper">
              <span className="premium-select-helper__visual" aria-hidden="true">
                <span className="premium-select-helper__cab"></span>
                <span className="premium-select-helper__route"></span>
                <span className="premium-select-helper__arrow"></span>
              </span>
              <span className="premium-select-helper__copy">{tripTypeHelperText}</span>
            </p>
          </div>
        </div>

        <div className="search-item search-button">
          <button className="btn btn-search" type="submit">
            <img
              src="/assets/imgs/template/icons/search.svg"
              alt=""
              aria-hidden="true"
            />
            Check Availability
          </button>
        </div>
      </form>
    </section>
  );
}
