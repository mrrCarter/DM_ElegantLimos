import { activeInputFocus } from "@/utlis/activeInputFocus";
import { useEffect } from "react";

export default function ContactForm() {
  useEffect(() => {
    // Focus event
    activeInputFocus();
  }, []);

  return (
    <section className="section mt-60 mb-120"> {/* Reduced top margin */}
      <div className="container-sub">
        <div className="mw-770">
          <h2 className="heading-44-medium mb-10 text-center wow fadeInUp"> {/* Reduced bottom margin */}
            Get in Touch with Us
          </h2>
          <p className="text-center text-gray wow fadeInUp mb-60"> {/* Gray text under the heading */}
            We usually respond within a few hours. Your message is important to us!
          </p>
          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullname">
                      Full Name
                    </label>
                    <input
                      className="form-control"
                      id="fullname"
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="subject">
                      Subject
                    </label>
                    <input
                      className="form-control"
                      id="subject"
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="message">
                      Message
                    </label>
                    <textarea className="form-control" id="message"></textarea>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button className="btn btn-primary" type="submit">
                    Send Message
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
