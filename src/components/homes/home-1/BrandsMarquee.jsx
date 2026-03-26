const FLEET_BRANDS = [
  { label: "Mercedes-Benz", meta: "Executive sedan" },
  { label: "Cadillac", meta: "Luxury black car" },
  { label: "Chevrolet Suburban", meta: "Group-friendly SUV" },
  { label: "BMW", meta: "Client-ready comfort" },
  { label: "Airport Transfers", meta: "Flight-aware timing" },
  { label: "Hourly Chauffeur", meta: "Multi-stop coverage" },
];

const SERVICE_MARKS = [
  { label: "Logan Airport", meta: "Terminal pickups" },
  { label: "Seaport", meta: "Hotel and cruise access" },
  { label: "Back Bay", meta: "Business arrivals" },
  { label: "Cambridge", meta: "Corporate routing" },
  { label: "Special Events", meta: "Guest coordination" },
  { label: "Direct Dispatch", meta: "Fast itinerary support" },
];

function BrandChip({ item }) {
  return (
    <article className="premium-brand-chip">
      <span>{item.meta}</span>
      <strong>{item.label}</strong>
    </article>
  );
}

function BrandTrack({ items, reverse = false }) {
  return (
    <div className="premium-brand-row">
      <div className={`premium-brand-track ${reverse ? "is-reverse" : ""}`}>
        {items.map((item) => (
          <BrandChip key={`${item.label}-${item.meta}`} item={item} />
        ))}
        <div className="premium-brand-track-duplicate" aria-hidden="true">
          {items.map((item) => (
            <BrandChip
              key={`${item.label}-${item.meta}-duplicate`}
              item={item}
            />
          ))}
        </div>
      </div>
      <div className="premium-brand-grid" aria-hidden="true">
        {items.map((item) => (
          <BrandChip key={`${item.label}-${item.meta}-grid`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function BrandsMarquee() {
  return (
    <section className="section premium-brand-section" aria-labelledby="fleet-signature-title">
      <div className="container-sub">
        <div className="premium-section-head premium-section-head--center">
          <p className="premium-section-eyebrow">Fleet Signature</p>
          <h2 id="fleet-signature-title">
            The vehicles, routes, and service modes clients ask for most.
          </h2>
          <p>
            Inspired by the continuous brand motion pattern you use in
            `sentinelayer-web`, but tuned for a luxury transport brand and
            reduced-motion safe by default.
          </p>
        </div>
        <div className="premium-brand-stack">
          <BrandTrack items={FLEET_BRANDS} />
          <BrandTrack items={SERVICE_MARKS} reverse />
        </div>
      </div>
    </section>
  );
}
