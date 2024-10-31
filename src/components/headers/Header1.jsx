import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import { Link } from "react-router-dom";
import Language from "./components/Language";

export default function Header1() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header sticky-bar ${scrolled ? "stick" : ""}`}>
      <div className="container">
        <div className="main-header">
          <div className="header-left">
            <div className="header-logo">
              <Link className="d-flex" to="/">
                <img
                  alt="DmElegantLimos"
                  src="assets/dm_logo_2_processed.jpg"
                  style={{
                    width: window.innerWidth <= 768 ? "100px" : "150px", // Smaller size for mobile
                    height: "auto", // Maintain aspect ratio
                    transition: "width 0.3s ease", // Smooth transition for resizing
                  }}
                />
              </Link>
            </div>
            <div className="header-nav">
              <nav className="nav-main-menu d-none d-xl-block">
                <ul className="main-menu">
                  <Nav />
                </ul>
              </nav>
              <div className="burger-icon burger-icon-white"
              style={{top:"60px"}}>
                <span className="burger-icon-mid"></span>
                <span className="burger-icon-bottom"></span>
              </div>
            </div>
            {/* <div className="header-right">
              <div className="d-none d-xxl-inline-block align-middle mr-10">
                <a
                  className="text-14-medium call-phone color-white hover-up"
                  href="tel:+41227157000"
                >
                  +41 22 715 7000
                </a>
              </div>
              <div className="d-none d-xxl-inline-block box-dropdown-cart align-middle mr-10">
                <Language />
              </div>
              <div className="box-button-login d-inline-block mr-10 align-middle">
                <Link className="btn btn-default hover-up" to="/login">
                  Log In
                </Link>
              </div>
              <div className="box-button-login d-none2 d-inline-block align-middle">
                <Link className="btn btn-white hover-up" to="/register">
                  Sign Up
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}
