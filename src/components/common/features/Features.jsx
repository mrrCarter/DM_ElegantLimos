import { features } from "@/data/features";

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
        <div className="row mt-50 premium-feature-grid">
          {features.map((elm, i) => (
            <div key={i} className="col-lg-4">
              <div className="cardIconTitleDesc premium-feature-card">
                <div className="cardIcon">
                  <img src={elm.icon} alt={elm.title} />
                </div>
                <div className="cardTitle">
                  <h5 className="text-20-medium color-text">{elm.title}</h5>
                </div>
                <div className="cardDesc">
                  <p className="text-16 color-text">{elm.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
