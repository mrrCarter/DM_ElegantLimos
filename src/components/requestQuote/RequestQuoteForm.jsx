import React, { useState } from "react";
import emailjs from "emailjs-com";

// Environment Variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_QUOTE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_QUOTE;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function RequestQuoteForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    serviceType: "",
    date: "",
    details: "",
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
      phone: formData.phone,
      serviceType: formData.serviceType,
      date: formData.date,
      details: formData.details,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID_QUOTE, templateParams, PUBLIC_KEY)
      .then(
        (response) => {
          console.log("Quote request sent successfully!", response.status, response.text);
          setSubmitted(true);
          setLoading(false);
        },
        (error) => {
          console.error("Failed to send quote request:", error);
          setLoading(false);
        }
      );
  };

  return (
    <section className="section mt-60 mb-120">
      <div className="container-sub">
        <div className="mw-770">
          <h2 className="heading-44-medium mb-10 text-center wow fadeInUp">
            Request a Quote
          </h2>
          <p className="text-center text-gray wow fadeInUp mb-60">
            Fill out the form below to receive a quote for our services.
          </p>
          {submitted ? (
            <div className="text-center mt-40">
              <img
                className="mb-20"
                src="/assets/imgs/page/booking/completed.png"
                alt="Quote Request Sent Confirmation"
              />
              <h4 className="heading-24-medium color-text mb-10">
                Your quote request was sent successfully!
              </h4>
              <p className="text-14 color-grey mb-40">
                A representative will contact you shortly with your quote.
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
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <label className="form-label" htmlFor="phone">
                      Phone Number
                    </label>
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <label className="form-label" htmlFor="serviceType">
                      Service Type
                    </label>
                    <div className="form-group">
                      <select
                        className="form-control"
                        id="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                      >
                        <option value="">Select a service</option>
                        <option value="Airport Transfers">Airport Transfers</option>
                        <option value="Point-to-Point">Point-to-Point</option>
                        <option value="Hourly">Hourly</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Special Events">Special Events</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <label className="form-label" htmlFor="date">
                      Date
                    </label>
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <label className="form-label" htmlFor="details">
                      Additional Details
                    </label>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        id="details"
                        value={formData.details}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                      {loading ? "Sending Request..." : "Request Quote"}
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
