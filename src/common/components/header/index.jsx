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
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import UserIcon from "../../assets/user-icon.svg?react";

const DialogueContext = createContext();

export const useDialogue = () => {
  return useContext(DialogueContext);
};

const Header = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArrowClicked, setIsArrowClicked] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state
    });

    // Cleanup the subscription when component unmounts
    return () => unsubscribe();
  }, []);

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
          {!user ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => openDialogue("login")}
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
                <span className="greeting">
                  Welcome, {user.displayName || user.email}
                </span>
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
                  signOut(auth)
                    .then(() => {
                      // Sign-out successful.
                      setIsArrowClicked((prev) => !prev);
                      navigate("/");
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    })
                    .catch((error) => {
                      // An error happened.
                      console.log(error);
                    });
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

export default Header;
