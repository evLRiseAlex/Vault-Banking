import { useNavigate } from "react-router";
import Container from "./index.styled";

function Logo() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container>
      <button className="btn__logo" onClick={handleClick}>
        <img src="/vault-dark.png" alt="Logo" />
      </button>
    </Container>
  );
}

export default Logo;
