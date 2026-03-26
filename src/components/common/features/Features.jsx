import { features } from "@/data/features";
import { Link } from "react-router-dom";

export default function Features() {
  return (
    <section className="section premium-features-section">
      <div className="container-sub">
        <div className="premium-section-head premium-section-head--center">
          <p className="premium-section-eyebrow">Why Riders Switch</p>
          <h2>Service that feels deliberate from pickup request to final drop-off.</h2>
          <p>
            Every ride is designed to reduce friction: transparent pricing,
            polished vehicles, and chauffeurs who know the assignment.
          </p>
        </div>
        <div className="premium-feature-grid">
          {features.map((elm, i) => (
            <article key={i} className="cardIconTitleDesc premium-feature-card">
              <div className="cardIcon">
                <img src={elm.icon} alt={elm.title} />
              </div>
              <div className="cardTitle">
                <h5 className="text-20-medium color-text">{elm.title}</h5>
              </div>
              <div className="cardDesc">
                <p className="text-16 color-text">{elm.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="premium-feature-note">
          <div>
            <span className="premium-section-eyebrow">Concierge Option</span>
            <p>
              Need event transport or a more complex itinerary? Use the quote
              flow for manual coordination instead of forcing a generic checkout
              path.
            </p>
          </div>
          <Link className="premium-footer-link" to="/request-a-quote">
            Talk to Dispatch
          </Link>
        </div>
      </div>
    </section>
  );
}
