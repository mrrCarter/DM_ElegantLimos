import { useState } from "react";
import emailjs from "emailjs-com";
import { isQuoteFormConfigured } from "@/lib/runtimeConfig";

// Environment Variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_QUOTE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_QUOTE;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const quoteFormConfigured = isQuoteFormConfigured(import.meta.env);

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
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullname) newErrors.fullname = "Full name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.serviceType) newErrors.serviceType = "Service type is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!quoteFormConfigured) {
      setSubmitError("Quote request delivery is not configured in this environment.");
      return;
    }

    if (!validateForm()) return;
    setLoading(true);

    const templateParams = {
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      serviceType: formData.serviceType,
      date: formData.date,
      details: formData.details,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID_QUOTE, templateParams, PUBLIC_KEY);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to send quote request:", error);
      setSubmitError("We could not send the quote request right now. Please call dispatch.");
    } finally {
      setLoading(false);
    }
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
          {!quoteFormConfigured && (
            <div className="alert alert-warning mb-30" role="status">
              Quote request email delivery is not configured yet in this environment.
            </div>
          )}
          {submitError && (
            <div className="alert alert-warning mb-30" role="alert">
              {submitError}
            </div>
          )}
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
                      {errors.fullname && <p className="text-danger">{errors.fullname}</p>}
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
                      {errors.email && <p className="text-danger">{errors.email}</p>}
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
                      {errors.phone && <p className="text-danger">{errors.phone}</p>}
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
                      {errors.serviceType && <p className="text-danger">{errors.serviceType}</p>}
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
                      {errors.date && <p className="text-danger">{errors.date}</p>}
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
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={loading || !quoteFormConfigured}
                    >
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
