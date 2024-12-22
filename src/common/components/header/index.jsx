import { useState, useEffect, createContext, useContext } from "react";
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
  Overlay,
  ButtonDropDown,
  UserDropDown,
} from "../../../common";
import { ModalLogIn, ModalSignUp } from "../../../features";
import { useNavigate, useLocation } from "react-router";
import UserIcon from "../../assets/user-icon.svg?react";
import API from "../../../API";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const DialogueContext = createContext();

export const useDialogue = () => {
  return useContext(DialogueContext);
};

export const DialogueProvider = ({ children }) => {
  const [dialogueType, setDialogueType] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Check if the user is authenticated
  const isAuthenticated = Boolean(sessionStorage.getItem("id_token"));

  const openDialogue = (type) => {
    if (isAuthenticated) {
      // Redirect authenticated users to /summary
      if (location.pathname !== "/summary") {
        navigate("/summary");
      } else {
        navigate("/summary", { replace: true }); // Clean up URL query
      }
      return;
    }
    setDialogueType(type);
  };

  const closeDialogue = () => {
    setDialogueType(null);
    navigate(location.pathname, { replace: true }); // Remove query string
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const dialogue = params.get("dialogue");

    if (dialogue) {
      openDialogue(dialogue);
    }
  }, [location]);

  return (
    <DialogueContext.Provider value={{ openDialogue, closeDialogue }}>
      {children}
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
    </DialogueContext.Provider>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArrowClicked, setIsArrowClicked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const userData = sessionStorage.getItem("userID");

  const handleLogout = async () => {
    API.user.logout();
    sessionStorage.clear();
    await navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsMenuOpen(false);
    setIsArrowClicked(false);
    console.log(isMenuOpen);
    toast("You have logged out successfully.", { type: "success" });
  };

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
        console.log(isScrolled);
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
      <HeaderContainer
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        isArrowClicked={isArrowClicked}
      >
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
          {!userData ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  openDialogue("login");
                }}
              >
                Log In
              </Button>
              <Button
                display="none"
                variant="fill"
                onClick={() => openDialogue("signup")}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <div className="user-info">
                <span className="greeting">{"My Account"}</span>
                <div className="icon-divider">
                  <UserIcon className="user" />

                  <ButtonDropDown
                    isArrowClicked={isArrowClicked}
                    onClick={() => {
                      console.log(isArrowClicked);
                      setIsArrowClicked((prev) => !prev);
                    }}
                    className="user-dropdown"
                    type="button"
                    // variant="outline"
                    // onClick={() => {
                    //   auth.signOut(); // Log out button
                    // }}
                  >
                    ◀
                  </ButtonDropDown>
                </div>
              </div>
              <UserDropDown
                onClick={() => {
                  handleLogout();
                }}
                isArrowClicked={isArrowClicked}
              />
            </>
          )}
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

DialogueProvider.propTypes = {
  children: PropTypes.element,
};

export default Header;
