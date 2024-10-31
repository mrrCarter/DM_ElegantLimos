import { useEffect, useState } from "react";
import Nav from "./components/Nav";

import { Link } from "react-router-dom";

export default function Header9() {
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
    <header
      className={`header header-transparent sticky-bar ${
        scrolled ? "stick" : ""
      }`}
    >
      <div className="container-sub">
        <div className="main-header">
          <div className="header-left">
            <div className="header-logo">
              <Link className="d-flex" to="/">
                <img alt="luxride" src="assets/imgs/template/logo.svg" />
              </Link>
            </div>
            <div className="header-nav">
              <nav className="nav-main-menu d-none d-xl-block">
                <ul className="main-menu">
                  <Nav />
                </ul>
              </nav>
              <div className="burger-icon burger-icon-white">
                <span className="burger-icon-mid"></span>
                <span className="burger-icon-bottom"></span>
              </div>
            </div>
            <div className="header-right">
              <div className="box-button-login d-inline-block mr-10 align-middle">
                <Link
                  className="btn text-14-medium color-white hover-up"
                  to="/login"
                >
                  Log In
                </Link>
              </div>
              <div className="box-button-login d-none2 d-inline-block align-middle">
                <Link className="btn btn-border hover-up" to="/register">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}