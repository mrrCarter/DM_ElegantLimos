import { useEffect, useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import Nav from "./components/Nav";

const MOBILE_MENU_TOGGLE_EVENT = "premium-mobile-menu-toggle";
const MOBILE_MENU_STATE_EVENT = "premium-mobile-menu-state";

const subscribeToScroll = (callback) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("scroll", callback, { passive: true });
  return () => {
    window.removeEventListener("scroll", callback);
  };
};

const getScrollSnapshot = () =>
  typeof window !== "undefined" ? window.scrollY > 200 : false;

export default function Header1() {
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    () => false
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleMenuState = (event) => {
      setIsMobileMenuOpen(Boolean(event.detail?.open));
    };

    window.addEventListener(MOBILE_MENU_STATE_EVENT, handleMenuState);

    return () => {
      window.removeEventListener(MOBILE_MENU_STATE_EVENT, handleMenuState);
    };
  }, []);

  const toggleMobileMenu = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.dispatchEvent(new CustomEvent(MOBILE_MENU_TOGGLE_EVENT));
  };

  return (
    <header className={`header sticky-bar premium-header ${scrolled ? "stick" : ""}`}>
      <div className="container">
        <div className="main-header premium-header-inner">
          <div className="header-left">
            <div className="header-logo">
              <Link className="d-flex" to="/">
                <img
                  alt="DmElegantLimos"
                  src="assets/dm_logo_2_processed.jpg"
                  className="premium-header-logo"
                />
              </Link>
            </div>
            <div className="header-nav">
              <nav className="nav-main-menu d-none d-xl-block">
                <ul className="main-menu">
                  <Nav />
                </ul>
              </nav>
              <button
                type="button"
                className={`burger-icon burger-icon-white premium-burger d-xl-none ${
                  isMobileMenuOpen ? "burger-close" : ""
                }`}
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-controls="mobile-navigation"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="burger-icon-top"></span>
                <span className="burger-icon-mid"></span>
                <span className="burger-icon-bottom"></span>
              </button>
            </div>
          </div>
          <div className="header-right premium-header-actions">
            <a className="premium-header-phone" href="tel:+17817719069">
              +1 (781) 771-9069
            </a>
            <Link className="btn premium-header-cta" to="/booking">
              Reserve Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
