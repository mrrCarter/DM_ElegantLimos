import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileNav from "./components/MobileNav";

const MOBILE_MENU_TOGGLE_EVENT = "premium-mobile-menu-toggle";
const MOBILE_MENU_STATE_EVENT = "premium-mobile-menu-state";

export default function MobailHeader1() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleToggle = () => {
      setIsOpen((previousState) => !previousState);
    };

    window.addEventListener(MOBILE_MENU_TOGGLE_EVENT, handleToggle);

    return () => {
      window.removeEventListener(MOBILE_MENU_TOGGLE_EVENT, handleToggle);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    document.body.classList.toggle("mobile-menu-active", isOpen);
    window.dispatchEvent(
      new CustomEvent(MOBILE_MENU_STATE_EVENT, {
        detail: { open: isOpen },
      })
    );

    if (isOpen) {
      panelRef.current?.focus();
    }

    return () => {
      document.body.classList.remove("mobile-menu-active");
      window.dispatchEvent(
        new CustomEvent(MOBILE_MENU_STATE_EVENT, {
          detail: { open: false },
        })
      );
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
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
          onClick={() => setIsOpen(false)}
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
                    onClick={() => setIsOpen(false)}
                    aria-label="Close navigation menu"
                  >
                    Close
                  </button>
                </div>

                <nav className="mt-15" aria-label="Mobile primary">
                  <ul className="mobile-menu font-heading premium-mobile-menu-list">
                    <MobileNav onNavigate={() => setIsOpen(false)} />
                  </ul>
                </nav>

                <div className="premium-mobile-cta-panel">
                  <p>
                    Book airport transfers, hourly service, and event rides
                    with direct dispatch support.
                  </p>
                  <div className="premium-mobile-cta-actions">
                    <Link className="btn btn-primary" to="/booking" onClick={() => setIsOpen(false)}>
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
