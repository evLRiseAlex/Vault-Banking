import { Button } from "../../../../common";
import Container from "./index.styled";
import PropTypes from "prop-types";

const ModalConfirmPassword = (props) => {
  return (
    <Container {...props}>
      {props.children}
      <Button onClick={props.onClick} className="btn__modal" variant="fill">
        Submit
      </Button>
    </Container>
  );
};

ModalConfirmPassword.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
};

export default ModalConfirmPassword;
