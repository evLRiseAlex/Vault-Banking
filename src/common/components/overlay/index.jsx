import Container from "./index.styled";
import PropTypes from "prop-types";

const Overlay = (props) => {
  return <Container isHidden={props.isHidden}></Container>;
};

Overlay.propTypes = {
  isHidden: PropTypes.bool,
};

export default Overlay;
