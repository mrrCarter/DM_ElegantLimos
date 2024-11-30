import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import { Link } from "react-router-dom";

export default function Header1() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`header sticky-bar ${scrolled ? "stick" : ""}`}
      style={{ backgroundColor: "#000" }}
    >
      <div className="container">
        <div className="main-header">
          {/* Header Left: Logo and Navigation */}
          <div className="header-left">
            {/* Logo */}
            <div className="header-logo">
              <Link className="d-flex" to="/">
                <img
                  alt="DmElegantLimos"
                  src="assets/dm_logo_2_processed.jpg"
                  style={{
                    width: "150px",
                    height: "auto",
                    transition: "width 0.3s ease",
                  }}
                />
              </Link>
            </div>
            {/* Navigation */}
            <div className="header-nav">
              <nav className="nav-main-menu d-none d-lg-block">
                <ul className="main-menu">
                  <Nav />
                </ul>
              </nav>
              <div className="burger-icon burger-icon-white d-lg-none">
                <span className="burger-icon-mid"></span>
                <span className="burger-icon-bottom"></span>
              </div>
            </div>
          </div>

          {/* Header Right: Phone Number */}
          <div className="header-right">
            <a
              className="text-14-medium call-phone color-white hover-up d-inline"
              href="tel:+17817719069"
            >
              +1 (781) 771 - 9069
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
