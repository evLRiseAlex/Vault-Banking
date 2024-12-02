import { ToSQuestions } from "./contants";
import Question from "./Question";
import styles from "../styles/tos.module.css";
import { useState, useEffect } from "react";

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
