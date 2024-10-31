import DatePickerComponent from "@/components/common/DatePicker";
import PlacePicker from "@/components/common/PlacePicker";
import TimePickerComponent from "@/components/common/TimePicker";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

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

  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle the Search button click
  const handleSearchClick = () => {
    navigate("/booking-vehicle"); // Navigate to the BookingVehiclePage
    console.log("Search button clicked"); // Just for debugging
  };

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
                  backgroundSize: "cover", // Ensures the image covers the entire container
                  backgroundPosition: "center", // Centers the image
                  backgroundRepeat: "no-repeat", // Prevents repeating
                  height: "350px", // Fix height to 860px
                  width: "100%", // Make sure it covers the full width
                  maxWidth: "1920px", // Limit the width to 1920px
                  margin: "0 auto", // Center it horizontally if you want it inside a container
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
            <DatePickerComponent />
          </div>
        </div>
        <div className="search-item search-time">
          <div className="search-icon">
            <span className="item-icon icon-time"> </span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey">Time</label>
            <TimePickerComponent />
          </div>
        </div>
        <div className="search-item search-from">
          <div className="search-icon">
            <span className="item-icon icon-from"> </span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey">From</label>
            <PlacePicker />
          </div>
        </div>
        <div className="search-item search-to">
          <div className="search-icon">
            <span className="item-icon icon-to"> </span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey">To</label>
            <PlacePicker />
          </div>
        </div>
        <div className="search-item search-button">
          <button className="btn btn-search" type="submit" onClick={handleSearchClick}>
            <img src="/assets/imgs/template/icons/search.svg" alt="luxride" />
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
