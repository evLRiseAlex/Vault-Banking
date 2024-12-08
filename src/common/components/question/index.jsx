import { useState } from "react";
import PropTypes from "prop-types";
import { QuestionContainer } from "./index.styled";
import Button from "../button";

function Question({ questionText, questionAnswer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <QuestionContainer>
      <div>
        <h4>{questionText}</h4>
        <Button
          variant="outline"
          onClick={() => setShowAnswer((prev) => !prev)}
        >
          {showAnswer ? "-" : "+"}
        </Button>
      </div>
      <p className={showAnswer ? "visible" : "hidden"}>{questionAnswer}</p>
    </QuestionContainer>
  );
}

Question.propTypes = {
  questionText: PropTypes.string.isRequired,
  questionAnswer: PropTypes.string.isRequired,
};

export default Question;
