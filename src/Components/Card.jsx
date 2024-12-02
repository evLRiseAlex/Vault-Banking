import styles from "../styles/card.module.css";
import { useState, useEffect } from "react";
import { cardColors } from "./contants";

function Card() {
  const [cardNumber, setCardNumber] = useState("0000 1234 5678 9010");
  const [expirationDate, setExpirationDate] = useState("12/99");
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const cycleCard = setInterval(() => {
      const randomColor =
        cardColors[Math.floor(Math.random() * cardColors.length)];
      document.documentElement.style.setProperty(
        "--card-background",
        `url('/card-bg_${randomColor}.png')`
      );

      const generateRandomNumber = () =>
        Array(4)
          .fill(0)
          .map(() => Math.floor(1000 + Math.random() * 9000))
          .join(" ");

      const generateRandomExpiry = () => {
        const month = String(Math.floor(Math.random() * 12) + 1).padStart(
          2,
          "0"
        );
        const year = String(Math.floor(24 + Math.random() * 10));
        return `${month}/${year}`;
      };

      setOpacity(0);

      setTimeout(() => {
        setCardNumber(generateRandomNumber());
        setExpirationDate(generateRandomExpiry());
        setOpacity(1);
      }, 300);
    }, 5000);

    return () => clearInterval(cycleCard); // Cleanup on unmount
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--text-opacity", opacity);
  }, [opacity]);

  return (
    <main className={styles.borderBox}>
      <div className={styles.containerCard}>
        <img
          className={styles.logo}
          src="/vault-dark.png"
          alt=""
          align="right"
        />
        <img src="/card-chip.png" alt="" className={styles.chip} />
        <h5 className={`${styles.text} ${styles.fadeText}`}>{cardNumber}</h5>
        <div className={styles.flexContainer}>
          <p>Exp Date:</p>
          <h5 className={styles.fadeText}>{expirationDate}</h5>
        </div>
        <h5 className={styles.cardholder}>Vault Banking</h5>
      </div>
    </main>
  );
}

export default Card;
