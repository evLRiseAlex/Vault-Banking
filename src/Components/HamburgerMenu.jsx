import { useState } from "react";
import NavLinks from "./NavLinks";
import styles from "../styles/hamburger.module.css";

function Hamburger() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <div className={styles.navContainer}>
      {/* Hamburger button */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        <NavLinks />
      </div>
    </div>
  );
}

export default Hamburger;
