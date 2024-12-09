import Container from "./index.styled";
import PropTypes from "prop-types";
import { useState } from "react";

const TermItem = ({ answer, item }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Container isClicked={isClicked}>
      <div>
        <button onClick={() => setIsClicked(!isClicked)}>▶</button>
        <h4>{item}</h4>
      </div>
      <p>{answer}</p>
    </Container>
  );
};

TermItem.propTypes = {
  item: PropTypes.string,
  answer: PropTypes.string,
};

export default TermItem;
