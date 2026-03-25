import { process } from "@/data/process";

export default function Process() {
  return (
    <section className="section premium-process-section">
      <div className="container-sub">
        <div className="premium-section-head">
          <p className="premium-section-eyebrow">How It Works</p>
          <h2>Reserve in minutes. Arrive composed.</h2>
          <p>
            Built for travelers who want executive polish without chasing a
            dispatcher or guessing what the ride will cost.
          </p>
        </div>
        <div className="premium-process-grid">
          {process.map((elm, index) => (
            <article key={elm.id} className="premium-process-card">
              <span className="premium-process-step">0{index + 1}</span>
              <img src={elm.img} alt={elm.title} />
              <h3>{elm.title}</h3>
              <p>{elm.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
