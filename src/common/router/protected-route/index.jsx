import PropTypes from "prop-types";
import Container from "./index.styled";

import { useDialogue } from "../../components/header";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
// import { ModalLogIn } from "../../../features";

const ProtectedRoute = (props) => {
  const { openDialogue } = useDialogue();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const idToken = sessionStorage.getItem("id_token");
    console.log(idToken);
    if (idToken) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Container>
        <span className="loader"></span>
      </Container>
    );
  }

  console.log(isAuthenticated);

  if (isAuthenticated) {
    return props.children;
  } else {
    navigate("/"); // Redirect to homepage
    openDialogue("login"); // Open login modal
    return null; // Prevent rendering children while showing modal
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};

export default ProtectedRoute;
