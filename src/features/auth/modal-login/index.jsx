import { Button, Modal, TextField } from "../../../common";
import Container from "./index.styled";
import EmailIcon from "../../../common/assets/mail-icon.svg?react";
import PasswordIcon from "../../../common/assets/password.svg?react";
import { useDialogue } from "../../../common/components/header";
import { toast } from "react-toastify";
import API from "../../../API";
import { useState } from "react";
import { useNavigate } from "react-router";

const ModalLogIn = () => {
  const { openDialogue, closeDialogue } = useDialogue();

  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });

    // Clear the error only for the field being edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleBlur = (name, value) => {
    const newErrors = { ...errors };

    if (name === "email") {
      const emailRegex = /[a-z0-9_.-]+@+[a-z0-9.-]+\.[a-z]{2,3}/gi;
      newErrors.email = !emailRegex.test(value)
        ? "Invalid email format." // Show error if email format is incorrect
        : null;
    }

    if (name === "password" && !value) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: !form.email
        ? "Email is required."
        : !/^[a-z0-9_.-]+@[a-z0-9.-]+\.[a-z]{2,3}$/gi.test(form.email)
        ? "Invalid email format."
        : null, // Validate email format and check if it's empty
      password: !form.password ? "Password is required." : null,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== null)) {
      return; // If there are any errors, prevent form submission
    }

    setIsLoading(true);

    try {
      const user = await API.user.login({
        email: form.email,
        password: form.password,
      });

      if (user) {
        toast("You are now logged in.", { type: "success" });
        sessionStorage.setItem("id_token", user.idToken);
        sessionStorage.setItem("userID", user.localId);
        closeDialogue();
        navigate("/summary");
      } else {
        toast("Invalid email or password", { type: "error" });
      }
    } catch (error) {
      toast("An error occurred. Please try again.", { type: "error" });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal>
      <Container onSubmit={handleSubmit}>
        <h2>Please Log In to continue</h2>
        <span className="container__section">
          <label htmlFor="email">Email</label>
          <span className="container__input">
            <TextField
              isErrorVisible={!!errors.email}
              errorChildren={errors.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={(e) => handleBlur("email", e.target.value)}
              type="text"
              id="email"
              isIconVisible={true}
              style={{
                backgroundColor: "transparent",
              }}
              placeholder={"eg. example@email.com"}
              iconChildren={
                <EmailIcon
                  style={{
                    backgroundColor: "transparent",
                    width: "20px",
                  }}
                />
              }
            ></TextField>
          </span>
          {errors.email && <p className="error-message">{errors.email}</p>}
        </span>
        <span className="container__section">
          <label htmlFor="password">Password</label>
          <span className="container__input">
            <TextField
              isErrorVisible={!!errors.password}
              errorChildren={errors.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={(e) => handleBlur("password", e.target.value)}
              type="password"
              id="password"
              isIconVisible={true}
              style={{
                backgroundColor: "transparent",
              }}
              placeholder={"Please enter your password"}
              iconChildren={
                <PasswordIcon
                  style={{
                    backgroundColor: "transparent",
                    width: "20px",
                  }}
                />
              }
            ></TextField>
          </span>
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </span>
        <Button variant="fill" disabled={isLoading}>
          {isLoading ? "Loading..." : "Log In"}
        </Button>
        <span className="container__register">
          <h4>{"Don't have an account yet?"}</h4>
          <span
            className="link"
            onClick={() => {
              closeDialogue();
              openDialogue("signup");
            }}
          >
            Create Account
          </span>
        </span>
      </Container>
    </Modal>
  );
};

export default ModalLogIn;
