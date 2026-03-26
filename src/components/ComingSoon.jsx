import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <section className="section">
      <div className="box-comingsoon" style={{ height: "100vh" }}>
        <div className="inner-comingsoon">
          <h2 className="heading-44-medium color-white wow fadeInUp">Blogs are</h2>
          <h1 className="heading-100-medium color-white wow fadeInUp">
            COMING SOON
          </h1>
          <Link className="btn btn-primary w-100" to="/">
            Book a Ride
            <svg
              className="icon-16 ml-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
