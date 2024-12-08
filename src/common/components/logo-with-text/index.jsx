import { Link } from "react-router-dom";
import Container from "./index.styled";

function LogoWithText() {
  return (
    <Container>
      <Link to="/">
        <img src="/vault-dark.png" alt="" />
      </Link>
    </Container>
  );
}

export default LogoWithText;
