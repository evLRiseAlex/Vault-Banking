import Container from "./index.styled";
import PropTypes from "prop-types";

const Modal = (props) => {
  return <Container isHidden={props.isHidden}></Container>;
};

Modal.propTypes = {
  isHidden: PropTypes.bool,
};

export default Modal;
