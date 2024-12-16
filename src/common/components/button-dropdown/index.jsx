import { Container } from "./index.styled";
import PropTypes from "prop-types";

const ButtonDropDown = (props) => {
  return (
    <Container isArrowClicked={props.isArrowClicked} {...props}>
      {props.children}
    </Container>
  );
};

ButtonDropDown.propTypes = {
  children: PropTypes.element,
  isArrowClicked: PropTypes.bool,
};

export default ButtonDropDown;
