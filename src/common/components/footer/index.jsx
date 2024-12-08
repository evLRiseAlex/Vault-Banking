import { FooterContainer } from "./index.styled";
import { Nav, StylingLine } from "../../../common";

function Footer() {
  return (
    <footer>
      <StylingLine />
      <FooterContainer>
        <Nav />
        <img src="/vault-icon-dark.png" alt="Vault Logo" />
      </FooterContainer>
    </footer>
  );
}

export default Footer;
