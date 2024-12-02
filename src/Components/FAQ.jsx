import Question from "./Question";
import { FAQQuestions } from "./contants";
import styles from "../styles/FAQ.module.css";

function FAQ() {
  const FAQList = FAQQuestions.map((entry) => {
    return (
      <Question
        key={entry.questionText}
        questionText={entry.question}
        questionAnswer={entry.answer}
      />
    );
  });
  return (
    <main className={styles.FAQContainer}>
      <div className={styles.FAQBox}>
        <ul>{FAQList}</ul>
      </div>
      <div className={styles.FAQHelp}>
        <p>Still need help?</p>
        <button className={`button ${styles.btnContact}`}>Contact Us</button>
      </div>
    </main>
  );
}

export default FAQ;
