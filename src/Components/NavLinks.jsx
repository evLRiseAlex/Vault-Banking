import { navSet } from "./contants";
import { Link } from "react-router-dom";
import styles from "../styles/navlinks.module.css";

function NavLinks() {
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navLinks}>
        {navSet.map((link) => (
          <li key={link}>
            <Link
              to={link.toLowerCase().split(" ")[0]}
              className={styles.navLink}
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavLinks;
