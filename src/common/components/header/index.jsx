import { useState, useEffect } from "react";
import {
  HeaderContainer,
  Hamburger,
  HamburgerLine,
  NavLinksContainer,
  NavLeft,
  ButtonContainer,
} from "./index.styled";
import {
  Button,
  LogoWithText,
  Nav,
  Logo,
  Modal,
  Overlay,
} from "../../../common";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHiddenSignUp, setIsHiddenSignUp] = useState(true);
  const [isHiddenLogIn, setIsHiddenLogIn] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (!isHiddenSignUp || !isHiddenLogIn) {
          setIsHiddenSignUp(true);
          setIsHiddenLogIn(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isHiddenSignUp, isHiddenLogIn]);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = document.querySelector("header").offsetHeight;
      setIsScrolled(window.scrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <HeaderContainer isScrolled={isScrolled} isMenuOpen={isMenuOpen}>
      <Hamburger isMenuOpen={isMenuOpen} onClick={toggleMenu}>
        <HamburgerLine />
        <HamburgerLine />
        <HamburgerLine />
      </Hamburger>

      <NavLeft>
        <LogoWithText />
        <Logo />
        <NavLinksContainer isMenuOpen={isMenuOpen}>
          <Nav media={true} />
        </NavLinksContainer>
      </NavLeft>
      <ButtonContainer>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsHiddenLogIn((prev) => !prev);
          }}
        >
          Log In
        </Button>
        <Button
          type="button"
          variant="fill"
          display="none"
          onClick={() => {
            setIsHiddenSignUp((prev) => !prev);
          }}
        >
          Sign Up
        </Button>
      </ButtonContainer>
      <Modal isHidden={isHiddenLogIn} />
      <Overlay isHidden={isHiddenLogIn} />
      <Modal isHidden={isHiddenSignUp} />
      <Overlay isHidden={isHiddenSignUp} />
    </HeaderContainer>
  );
};

export default Header;
