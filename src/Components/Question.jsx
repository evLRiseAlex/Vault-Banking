import { useState } from "react";
import styles from "../styles/question.module.css";

function Question({ questionText, questionAnswer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <li className={styles.container}>
      <div className={styles.question}>
        <h4>{questionText}</h4>
        <button
          className={styles.btn}
          onClick={() => setShowAnswer((prev) => !prev)}
        >
          {showAnswer ? "-" : "+"}
        </button>
      </div>
      <div className={showAnswer ? styles.answer : styles.hidden}>
        <p>{questionAnswer}</p>
      </div>
    </li>
  );
}

export default Question;
