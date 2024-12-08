import { useState, useEffect } from "react";
// import LogoWithText from "./LogoWithText";
import NavLinks from "./NavLinks";
import styles from "../styles/header.module.css";
import { Button, LogoWithText } from "../common";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  useEffect(() => {
    const headerCoords = document
      .querySelector("header")
      .getBoundingClientRect().height;

    const handleScroll = () => {
      if (!headerCoords) return;
      if (scrollTimeout) clearTimeout(scrollTimeout);

      const timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > headerCoords);
      }, 100);
      setScrollTimeout(timeoutId);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollTimeout]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header
      className={`${styles.header} ${
        isScrolled || isMenuOpen ? styles.scrolled : ""
      }`}
    >
      <div
        className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.navLeft}>
        {/* Logo */}
        <LogoWithText />

        {/* Hamburger Menu Button */}

        {/* NavLinks */}
        <nav
          className={`${styles.navLinksContainer} ${
            isMenuOpen ? styles.open : ""
          }`}
        >
          <NavLinks />
        </nav>
      </div>
      <div>
        <Button variant="outline">Log In</Button>
        <Button variant="fill">Sign Up</Button>
      </div>
    </header>
  );
};

export default Header;
