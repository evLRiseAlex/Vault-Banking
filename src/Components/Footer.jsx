import styles from "../styles/footer.module.css";
import NavLinks from "./NavLinks";
import StylingLine from "./StylingLine";

function Footer() {
  return (
    <footer>
      <StylingLine />
      <div className={styles.footerBox}>
        <div className={styles.footerContainer}>
          <NavLinks />
          <img
            className={styles.footerLogo}
            src="/vault-icon-dark.png"
            alt=""
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
