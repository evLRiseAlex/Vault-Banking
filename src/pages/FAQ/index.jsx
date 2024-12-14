import { FAQQuestions } from "../../common/index.constants";
import { Link } from "react-router";
import { FAQContainer, FAQBox, FAQHelp } from "./index.styled";
import { Button, Question } from "../../common";

function FAQ() {
  const FAQList = FAQQuestions.map((entry) => (
    <Question
      key={entry.questionText}
      questionText={entry.question}
      questionAnswer={entry.answer}
    />
  ));

  return (
    <FAQContainer>
      <FAQBox>
        <ul>{FAQList}</ul>
      </FAQBox>
      <FAQHelp>
        <p>Still need help?</p>
        <Link to="/contact">
          <Button variant="fill">Contact Us</Button>
        </Link>
      </FAQHelp>
    </FAQContainer>
  );
}

export default FAQ;
