import { useState, useEffect, createContext, useContext } from "react";
import {
  HeaderContainer,
  Hamburger,
  HamburgerLine,
  NavLinksContainer,
  NavLeft,
  ButtonContainer,
} from "./index.styled";
import { Button, LogoWithText, Nav, Logo, Overlay } from "../../../common";
import { ModalLogIn, ModalSignUp } from "../../../features";
import { useNavigate, useLocation } from "react-router";

const DialogueContext = createContext();

export const useDialogue = () => {
  return useContext(DialogueContext);
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const dialogueType = params.get("dialogue");

  const openDialogue = (type) => {
    navigate(`?dialogue=${type}`);
  };

  const closeDialogue = () => {
    navigate(location.pathname);
  };

  useEffect(() => {
    let debounceTimer;

    const handleScroll = () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      debounceTimer = setTimeout(() => {
        setIsScrolled(window.scrollY > 0);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(debounceTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleDialogue = window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDialogue();
      return () => window.removeEventListener("keydown", handleDialogue);
    });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <DialogueContext.Provider value={{ openDialogue, closeDialogue }}>
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
            onClick={() => openDialogue("login")}
          >
            Log In
          </Button>
          <Button
            type="button"
            variant="fill"
            display="none"
            onClick={() => openDialogue("signup")}
          >
            Sign Up
          </Button>
        </ButtonContainer>
        {dialogueType === "login" && (
          <>
            <ModalLogIn />
            <Overlay />
          </>
        )}
        {dialogueType === "signup" && (
          <>
            <ModalSignUp />
            <Overlay />
          </>
        )}
      </HeaderContainer>
    </DialogueContext.Provider>
  );
};

export default Header;
