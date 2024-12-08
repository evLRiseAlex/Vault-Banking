import Container from "./index.styled";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Container>
      <Link to="/">
        <img src="/vault-icon-dark.png" alt="" />
      </Link>
    </Container>
  );
}

export default Logo;
