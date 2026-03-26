import { useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import Nav from "./components/Nav";
import {
  getMobileMenuSnapshot,
  subscribeToMobileMenu,
  toggleMobileMenu,
} from "@/lib/mobileMenuStore";

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
  const isMobileMenuOpen = useSyncExternalStore(
    subscribeToMobileMenu,
    getMobileMenuSnapshot,
    () => false
  );

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
