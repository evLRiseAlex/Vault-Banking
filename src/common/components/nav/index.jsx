import { navSet } from "../../index.constants";
import { Link } from "react-router-dom";
import Container from "./index.styled";
import PropTypes from "prop-types";

function Nav(props) {
  return (
    <Container media={props.media}>
      <ul>
        {navSet.map((link) => (
          <li key={link}>
            <Link to={link.toLowerCase().split(" ")[0]}>{link}</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}

Nav.propTypes = {
  media: PropTypes.bool,
};

export default Nav;
