import { ToSQuestions } from "./contants";
import { Question } from "../common";
import styles from "../styles/tos.module.css";

function ToS() {
  const ToSList = ToSQuestions.map((entry) => {
    return (
      <Question
        key={entry.questionText}
        questionText={entry.question}
        questionAnswer={entry.answer}
      />
    );
  });
  return (
    <div className={`${styles.ToSModal}`}>
      <ul>{ToSList}</ul>
    </div>
  );
}

export default ToS;
