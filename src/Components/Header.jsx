import { useState, useEffect } from "react";
// import LogoWithText from "./LogoWithText";
import styles from "../styles/header.module.css";
import { Button, LogoWithText, Nav, Logo } from "../common";

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
        <Logo />
        {/* NavLinks */}
        <nav
          className={`${styles.navLinksContainer} ${
            isMenuOpen ? styles.open : ""
          }`}
        >
          <Nav media={true} />
        </nav>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <Button variant="outline">Log In</Button>
        <Button variant="fill" display="none">
          Sign Up
        </Button>
      </div>
    </header>
  );
};

export default Header;
