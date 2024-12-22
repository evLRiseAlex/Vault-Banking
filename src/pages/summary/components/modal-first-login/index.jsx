import { Button } from "../../../../common";
import Container from "./index.styled";
import PropTypes from "prop-types";

const ModalFirstLogin = (props) => {
  return (
    <Container {...props}>
      {props.children}
      <Button onClick={props.onClick} className="btn__modal" variant="fill">
        Got it!
      </Button>
    </Container>
  );
};

ModalFirstLogin.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
};

export default ModalFirstLogin;
