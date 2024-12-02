import { Link } from "react-router-dom";
import styles from "../styles/logowithtext.module.css";

function LogoWithText() {
  return (
    <Link to="/" className={styles.logo}>
      <img src="vault-dark.png" alt="" />
    </Link>
  );
}

export default LogoWithText;
