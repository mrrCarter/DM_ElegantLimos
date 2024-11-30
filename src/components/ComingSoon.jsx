import { useEffect, useState } from "react";
// import Countdown from "react-countdown";
// const Completionist = () => <span>Comming Soon!</span>;

// Renderer callback with condition
// const renderer = ({ days, hours, minutes, seconds, completed }) => {
//   if (completed) {
//     // Render a completed state
//     return <Completionist />;
//   } else {
//     // Render a countdown
//     return (
//       <div className="deals-countdown" data-countdown="2023/06/08 00:00:00">
//         <span className="countdown-section">
//           <span className="countdown-amount font-sm-bold lh-16">{days}</span>
//           <span className="countdown-period lh-14 font-xs"> days </span>
//         </span>
//         <span className="countdown-section">
//           <span className="countdown-amount font-sm-bold lh-16">{hours}</span>
//           <span className="countdown-period font-xs lh-14"> hour </span>
//         </span>
//         <span className="countdown-section">
//           <span className="countdown-amount font-sm-bold lh-16">{minutes}</span>
//           <span className="countdown-period font-xs lh-14"> min </span>
//         </span>
//         <span className="countdown-section">
//           <span className="countdown-amount font-sm-bold lh-16">{seconds}</span>
//           <span className="countdown-period font-xs lh-14"> sec </span>
//         </span>
//       </div>
//     );
//   }
// };

export default function ComingSoon() {
  // const [showCountDown, setShowCountDown] = useState(false);
  // useEffect(() => {
  //   setShowCountDown(true);
  // }, []);

  return (
    <section className="section">
      <div className="box-comingsoon" style={{ height: "100vh" }}>
        <div className="inner-comingsoon">
          <h2 className="heading-44-medium color-white wow fadeInUp">Blogs are</h2>
          <h1 className="heading-100-medium color-white wow fadeInUp">
            COMING SOON
          </h1>
          {/* <div className="box-count box-count-square mb-30 mt-90 wow fadeInUp">
            {showCountDown && (
              <Countdown date={Date.now() + 14645675768} renderer={renderer} />
            )}
          </div> */}
          {/* <p className="text-16 color-white" style={{ visibility: "visible" }}>
            Please subscribe to newsletter to get updates from us.
          </p>
          <div
            className="box-subscriber mt-30 "
            style={{ visibility: "visible" }}
          >
            <div className="inner-box-subscriber">
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Your Email"
                />
                <input
                  className="btn btn-subscriber"
                  type="submit"
                  value="Subscribe"
                />
              </form>
            </div>
          </div> */}
          <button
            className="btn btn-primary w-100"
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
    </section>
  );
}