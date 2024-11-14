import React, { useState } from "react";
import emailjs from "emailjs-com";

// Environment Variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_COMPANY = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_COMPANY;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      fullname: formData.fullname,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID_COMPANY, templateParams, PUBLIC_KEY)
      .then(
        (response) => {
          console.log("Email sent successfully!", response.status, response.text);
          setSubmitted(true);
          setLoading(false);
        },
        (error) => {
          console.error("Failed to send email:", error);
          setLoading(false);
        }
      );
  };

  return (
    <section className="section mt-60 mb-120">
      <div className="container-sub">
        <div className="mw-770">
          <h2 className="heading-44-medium mb-10 text-center wow fadeInUp">
            Get in Touch with Us
          </h2>
          <p className="text-center text-gray wow fadeInUp mb-60">
            We usually respond within a few hours. Your message is important to us!
          </p>
          {submitted ? (
            <div className="text-center mt-40">
              <img
                className="mb-20"
                src="/assets/imgs/page/booking/completed.png"
                alt="Message Sent Confirmation"
              />
              <h4 className="heading-24-medium color-text mb-10">
                Your message was sent successfully!
              </h4>
              <p className="text-14 color-grey mb-40">
                A representative will reply to you shortly.
              </p>
            </div>
          ) : (
            <div className="form-contact form-comment wow fadeInUp">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                      <label className="form-label" htmlFor="fullname">
                        Full Name
                      </label>
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="fullname"
                        type="text"
                        value={formData.fullname}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="email"
                        type="text"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                      <label className="form-label" htmlFor="subject">
                        Subject
                      </label>
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                      <label className="form-label" htmlFor="message">
                        Message
                      </label>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                      {loading ? "Sending Message..." : "Send Message"}
                      {!loading && (
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
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
