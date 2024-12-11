import Button from "../button";
import Container from "./index.styled";
import PropTypes from "prop-types";
import { useDialogue } from "../header";

const Modal = (props) => {
  const { closeDialogue } = useDialogue();
  return (
    <Container {...props}>
      <Button onClick={closeDialogue} className="btn__modal" variant="fill">
        X
      </Button>
      {props.children}
    </Container>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.children,
};

export default Modal;
