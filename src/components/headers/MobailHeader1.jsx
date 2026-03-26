import { useEffect, useRef, useSyncExternalStore } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileNav from "./components/MobileNav";
import {
  getMobileMenuSnapshot,
  setMobileMenuOpen,
  subscribeToMobileMenu,
} from "@/lib/mobileMenuStore";

export default function MobailHeader1() {
  const { pathname } = useLocation();
  const isOpen = useSyncExternalStore(
    subscribeToMobileMenu,
    getMobileMenuSnapshot,
    () => false
  );
  const panelRef = useRef(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      panelRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="premium-mobile-overlay is-visible"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation menu"
        />
      )}
      <div
        id="mobile-navigation"
        ref={panelRef}
        className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar premium-mobile-header ${
          isOpen ? "sidebar-visible" : ""
        }`}
        tabIndex={-1}
        aria-hidden={!isOpen}
      >
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-content-area">
            <div className="perfect-scroll">
              <div className="mobile-menu-wrap mobile-header-border premium-mobile-menu-shell">
                <div className="premium-mobile-menu-top">
                  <div>
                    <p className="premium-section-eyebrow">Navigation</p>
                    <h2>Boston black car service</h2>
                  </div>
                  <button
                    type="button"
                    className="premium-mobile-close"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close navigation menu"
                  >
                    Close
                  </button>
                </div>

                <nav className="mt-15" aria-label="Mobile primary">
                  <ul className="mobile-menu font-heading premium-mobile-menu-list">
                    <MobileNav onNavigate={() => setMobileMenuOpen(false)} />
                  </ul>
                </nav>

                <div className="premium-mobile-cta-panel">
                  <p>
                    Book airport transfers, hourly service, and event rides
                    with direct dispatch support.
                  </p>
                  <div className="premium-mobile-cta-actions">
                    <Link
                      className="btn btn-primary"
                      to="/booking"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Reserve Now
                    </Link>
                    <a className="premium-footer-link premium-footer-link--ghost" href="tel:+17817719069">
                      Call Dispatch
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
