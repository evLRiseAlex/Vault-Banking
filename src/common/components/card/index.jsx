import { useState, useEffect } from "react";
import { CardWrapper, CardContainer } from "./index.styled";
import { cardColors } from "../../index.constants";

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
    <CardWrapper>
      <CardContainer>
        <img src="/vault-dark.png" alt="Logo" className="logo" />
        <img src="/card-chip.png" alt="Chip" className="chip" />
        <h5>{cardNumber}</h5>
        <div>
          <p>Exp Date:</p>
          <h5>{expirationDate}</h5>
        </div>
        <h5 className="card-holder">Vault Banking</h5>
      </CardContainer>
    </CardWrapper>
  );
}

export default Card;
