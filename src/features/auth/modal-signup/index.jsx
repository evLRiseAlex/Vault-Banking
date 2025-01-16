import { Button, Modal, TextField } from "../../../common";
import Container from "./index.styled";
import { toast } from "react-toastify";

import EmailIcon from "../../../common/assets/mail-icon.svg?react";
import PasswordIcon from "../../../common/assets/password.svg?react";
import UserIcon from "../../../common/assets/user-icon.svg?react";

import { useState } from "react";
import { useDialogue } from "../../../common/components/header";
import API from "../../../API";
import { useNavigate } from "react-router";

const ModalSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    confirmPassword: null,
    firstName: null,
    lastName: null,
  });

  const navigate = useNavigate();
  const { openDialogue, closeDialogue } = useDialogue();

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });

    // Reset error for the field after user interaction
    setErrors({ ...errors, [name]: "" });
  };

  const handleBlur = (name) => (e) => {
    let value = e.target.value.trim();

    if (name === "firstName" || name === "lastName") {
      const regex = /^[A-Za-z]+$/;
      if (!regex.test(value)) {
        setErrors({ ...errors, [name]: "Only letters are allowed." });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }

    if (name === "email") {
      const emailRegex = /[a-z0-9_.-]+@[a-z0-9.-]+\.[a-z]{2,3}/gi;
      if (!emailRegex.test(value)) {
        setErrors({ ...errors, email: "Invalid email format." });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }

    if (name === "password") {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?^()#&])[A-Za-z\d@$#!%*?&]{8,}$/;

      if (!passwordRegex.test(value)) {
        setErrors({
          ...errors,
          password:
            "Password must be at least 8 characters, 1 uppercase, 1 lowercase, 1 symbol, and 1 number.",
        });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }

    if (name === "confirmPassword") {
      if (form.password !== form.confirmPassword) {
        setErrors({
          ...errors,
          confirmPassword: "The passwords don't match.",
        });
      } else {
        setErrors({ ...errors, confirmPassword: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /[a-z0-9_.-]+@[a-z0-9.-]+\.[a-z]{2,3}/gi;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?^()#&])[A-Za-z\d@$#!%*?&]{8,}$/;

    let allErrors = { ...errors };

    // Validate each field
    Object.entries(form).forEach(([key, value]) => {
      if (!value) {
        allErrors[key] = "This field is required";
      } else {
        allErrors[key] = "";
      }
    });

    // Validate first name and last name for only letters
    ["firstName", "lastName"].forEach((key) => {
      if (!form[key]) {
        allErrors[key] = "This field is required.";
      } else if (!/^[A-Za-z]+$/.test(form[key])) {
        allErrors[key] = "Only letters are allowed.";
      } else {
        allErrors[key] = "";
      }
    });

    setErrors(allErrors);

    if (Object.values(allErrors).some((value) => value)) {
      return;
    }

    if (!emailRegex.test(form.email)) {
      setErrors({ ...errors, email: "Invalid email format." });
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "The passwords don't match." });
      return;
    }

    if (!passwordRegex.test(form.password)) {
      setErrors({
        ...errors,
        password:
          "Password must be at least 8 characters, 1 uppercase, 1 lowercase, 1 symbol, and 1 number.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const newUser = await API.user.register({
        email: form.email,
        password: form.password,
      });

      if (newUser) {
        sessionStorage.setItem("id_token", newUser.idToken);
        sessionStorage.setItem("userID", newUser.localId);

        await API.profile.create({
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          userID: newUser.localId,
        });
        await API.card.create({
          userID: newUser.localId,
        });

        toast("Your account was successfully created.", { type: "success" });
        const response = await API.user.sendEmailVerification({
          idToken: newUser.idToken,
        });
        console.log(response.data);
        const loginRegistered = await API.user.login({
          email: form.email,
          password: form.password,
        });
        if (loginRegistered) {
          closeDialogue();
          await navigate("/summary");
        }
      } else {
        toast("The email is already in use", { type: "error" });
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
        <h2>Enter your account details</h2>
        <div className="container__name">
          <span className="container__section">
            <label htmlFor="first-name">First Name</label>
            <span className="container__input">
              <TextField
                onChange={(e) => handleChange("firstName", e.target.value)}
                onBlur={handleBlur("firstName")}
                placeholder="eg. John"
                type="text"
                id="first-name"
                isIconVisible={true}
                iconChildren={<UserIcon style={{ width: "20px" }} />}
                style={{
                  backgroundColor: "transparent",
                }}
                error={errors.firstName} // Display error if any
              />
            </span>
            {errors.firstName && (
              <p className="error-message">{errors.firstName}</p>
            )}
          </span>

          <span className="container__section">
            <label htmlFor="last-name">Last Name</label>
            <span className="container__input">
              <TextField
                onChange={(e) => handleChange("lastName", e.target.value)}
                onBlur={handleBlur("lastName")}
                placeholder="eg. Doe"
                type="text"
                id="last-name"
                isIconVisible={true}
                iconChildren={<UserIcon style={{ width: "20px" }} />}
                style={{
                  backgroundColor: "transparent",
                }}
                error={errors.lastName} // Display error if any
              />
            </span>
            {errors.lastName && (
              <p className="error-message">{errors.lastName}</p>
            )}
          </span>
        </div>
        <span className="container__section">
          <label htmlFor="email">Email</label>
          <span className="container__input">
            <TextField
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={handleBlur("email")}
              type="text"
              id="email"
              isIconVisible={true}
              iconChildren={<EmailIcon style={{ width: "20px" }} />}
              placeholder="eg. example@email.com"
              style={{
                backgroundColor: "transparent",
              }}
              error={errors.email} // Display error if any
            />
          </span>
          {errors.email && <p className="error-message">{errors.email}</p>}
        </span>
        <span className="container__section">
          <label htmlFor="password">Create Password</label>
          <span className="container__input">
            <TextField
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={handleBlur("password")}
              type="password"
              id="password"
              isIconVisible={true}
              iconChildren={<PasswordIcon style={{ width: "20px" }} />}
              placeholder="Please enter your password"
              style={{
                backgroundColor: "transparent",
              }}
              error={errors.password} // Display error if any
            />
          </span>
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </span>
        <span className="container__section">
          <label htmlFor="confirm-password">Confirm Password</label>
          <span className="container__input">
            <TextField
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              onBlur={handleBlur("confirmPassword")}
              type="password"
              id="confirm-password"
              isIconVisible={true}
              iconChildren={<PasswordIcon style={{ width: "20px" }} />}
              placeholder="Please confirm your password"
              style={{
                backgroundColor: "transparent",
              }}
              error={errors.confirmPassword} // Display error if any
            />
          </span>
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </span>
        <Button variant="fill" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Create Account"}
        </Button>
        <span className="container__register">
          <h4>{"Already have an account?"}</h4>
          <span
            className="link"
            onClick={() => {
              closeDialogue();
              openDialogue("login");
            }}
          >
            Log In
          </span>
        </span>
      </Container>
    </Modal>
  );
};

export default ModalSignUp;
