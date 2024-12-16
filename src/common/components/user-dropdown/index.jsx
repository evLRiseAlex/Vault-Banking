import { Container } from "./index.styled";
import { Link } from "react-router";
import PropTypes from "prop-types";
import StylingLine from "../divider-line";

const UserDropDown = (props) => {
  return (
    <Container isArrowClicked={props.isArrowClicked}>
      <ol>
        <li>
          <Link to="/summary">Home Bank</Link>
        </li>
        <StylingLine />
        <li>
          <Link to="/account">My Account</Link>
        </li>
        <StylingLine />
        <li className="logout" onClick={props.onClick}>
          Logout
        </li>
      </ol>
    </Container>
  );
};

UserDropDown.propTypes = {
  onClick: PropTypes.func,
  isArrowClicked: PropTypes.bool,
};

export default UserDropDown;
