import Container from "./index.styled";
import PropTypes from "prop-types";

const Modal = (props) => {
  return <Container {...props}>{props.children}</Container>;
};

Modal.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
};

export default Modal;
