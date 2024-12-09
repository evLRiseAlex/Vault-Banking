import TermItem from "../../common/components/terms-item";
import Container from "./index.styled";
import { ToSQuestions } from "../../common/index.constants";

const ToS = () => {
  const ToSList = ToSQuestions.map((entry) => (
    <TermItem
      key={entry.item}
      item={entry.item}
      answer={entry.answer}
    ></TermItem>
  ));
  return (
    <Container>
      <h1>Terms and Condition for Website Usage</h1>
      {ToSList}
    </Container>
  );
};

export default ToS;
