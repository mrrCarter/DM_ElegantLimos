import { Link } from "react-router-dom";
import { cars } from "@/data/cars";

const SERVICE_MOMENTS = [
  {
    title: "Airport arrivals without the friction",
    copy:
      "Flight-aware scheduling, polished pickups, and curbside timing for Logan arrivals that need to feel calm from the first text.",
  },
  {
    title: "Hourly service that stays composed",
    copy:
      "Keep one chauffeur through board meetings, dinners, and venue changes when the day is moving faster than the itinerary.",
  },
  {
    title: "Event transport that feels guest-ready",
    copy:
      "Handle VIP nights, celebrations, and executive hosting with direct dispatch support and clean, consistent presentation.",
  },
];

const ROUTE_CALLOUTS = [
  {
    label: "Popular routing",
    value: "Logan, Seaport, Back Bay, Cambridge, and metro Boston",
  },
  {
    label: "Booking confidence",
    value: "Transparent pricing before vehicle selection",
  },
  {
    label: "Support model",
    value: "Dispatch help for itinerary changes and event logistics",
  },
];

export default function FrontpageShowcase() {
  const featuredFleet = cars.slice(0, 2);

  return (
    <section className="section premium-showcase-section" aria-labelledby="premium-showcase-title">
      <div className="container-sub">
        <div className="premium-showcase-grid">
          <div className="premium-showcase-copy">
            <p className="premium-section-eyebrow">Frontpage Upgrade</p>
            <h2 id="premium-showcase-title">
              A better first impression for both mobile riders and high-intent
              corporate bookings.
            </h2>
            <p>
              The homepage now tells a clearer story after the hero: what the
              service is best at, where it performs well, and which vehicle
              classes anchor the experience.
            </p>

            <div className="premium-service-moments">
              {SERVICE_MOMENTS.map((moment) => (
                <article key={moment.title} className="premium-service-card">
                  <h3>{moment.title}</h3>
                  <p>{moment.copy}</p>
                </article>
              ))}
            </div>

            <div className="premium-showcase-actions">
              <Link className="btn btn-primary" to="/booking">
                Reserve a Ride
              </Link>
              <Link className="premium-footer-link premium-footer-link--ghost" to="/request-a-quote">
                Request a Quote
              </Link>
            </div>
          </div>

          <aside className="premium-showcase-panel" aria-label="Fleet and service highlights">
            <div className="premium-showcase-routes">
              {ROUTE_CALLOUTS.map((callout) => (
                <div key={callout.label} className="premium-showcase-route">
                  <span>{callout.label}</span>
                  <strong>{callout.value}</strong>
                </div>
              ))}
            </div>

            <div className="premium-fleet-grid">
              {featuredFleet.map((vehicle) => (
                <article key={vehicle.id} className="premium-fleet-card">
                  <img src={vehicle.imgSrc} alt={vehicle.title} loading="lazy" />
                  <div className="premium-fleet-card__body">
                    <p className="premium-section-eyebrow">{vehicle.title}</p>
                    <h3>{vehicle.description}</h3>
                    <div className="premium-fleet-card__meta">
                      <span>{vehicle.passenger} passengers</span>
                      <span>{vehicle.luggage} luggage</span>
                      <span>Starting from ${vehicle.price}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
