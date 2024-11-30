import { features7 } from "@/data/features";
import { Link } from "react-router-dom";

export default function Features() {
  return (
    <section className="section">
      <div className="container-sub">
        <div className="mt-60">
          <h2 className="heading-44-medium mb-30 color-text title-fleet wow fadeInUp">
            We reimagine the way the world moves for the better
          </h2>
          <div className="content-single wow fadeInUp">
            <p>
              We offer luxury chauffeur driven airport transfers and pickups to
              Boston. Exceptional Safe, Meet and Greet. 35 minutes of
              complimentary wait time and flight tracking. Professional Drivers
              & Vehicles. Fixed prices on airport transfers. VIP service,{" "}
              <Link to="/contact">
                <strong>
                  <u>get your quote today!</u>
                </strong>
              </Link>
            </p>
            <p>
              DM Elegant Limo is your best choice for luxury chauffeur driven
              airport transfers and pickups to Boston.
            </p>
            <ul className="list-ticks list-ticks-small">
              {features7.map((elm, i) => (
                <li key={i} className="text-16 mb-20">
                  {elm}
                </li>
              ))}
            </ul>
            <div className="button-container" style={{ textAlign: "right", marginTop: "20px" }}>
              <button
                className="btn btn-primary"
                onClick={() => window.location.href = '/'}
              >
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
