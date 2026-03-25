import {
  links1,
} from "@/data/footerLinks";

import { Link } from "react-router-dom";

export default function Footer1() {
  return (
    <footer className="footer premium-footer">
      <div className="footer-2 premium-footer-shell">
        <div className="container-sub">
          <div className="premium-footer-top">
            <div className="premium-footer-copy">
              <p className="premium-section-eyebrow">DM Elegant Limos</p>
              <h2>Boston black car service for airport transfers, executive travel, and elevated nights out.</h2>
              <p>
                Professional chauffeurs, polished vehicles, and clear pricing
                across Logan, Back Bay, Seaport, Cambridge, and beyond.
              </p>
            </div>
            <div className="premium-footer-actions">
              <a className="btn premium-footer-link" href="tel:+17817719069">
                Call Dispatch
              </a>
              <a
                className="btn premium-footer-link premium-footer-link--ghost"
                href="mailto:info@dmelegantlimo.com"
              >
                Email Team
              </a>
            </div>
          </div>
          <div className="footer-bottom premium-footer-bottom">
            <div className="row align-items-center">
              <div className="col-lg-8 col-md-12 text-center text-lg-start">
                <span className="text-14 color-white mr-50">
                  © {new Date().getFullYear()} DM Elegant Limos. All Rights Reserved
                </span>
                <ul className="menu-bottom">
                  {links1.map((elm, i) => (
                    <li key={i}>
                      <Link to={elm.href}>{elm.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-4 col-md-12 text-center text-lg-end premium-footer-meta">
                Airport Transfers • Hourly Chauffeur • Corporate Travel
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
