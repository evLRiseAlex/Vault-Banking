import { Button, Modal, TextField } from "../../../common";
import Container from "./index.styled";
import { toast } from "react-toastify";

import EmailIcon from "../../../common/assets/mail-icon.svg?react";
import PasswordIcon from "../../../common/assets/password.svg?react";
import UserIcon from "../../../common/assets/user-icon.svg?react";

import { useState } from "react";
import { useDialogue } from "../../../common/components/header";
import API from "../../../API";

const ModalSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });

  const { openDialogue, closeDialogue } = useDialogue();

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    //Tip: Prevent refresh
    e.preventDefault();

    const values = Object.entries(form); // []
    console.log(values);

    const emailRegex = /[a-z0-9_.-]+@+[a-z0-9.-]+\.[a-z]{2,3}/gi;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?^()#&])[A-Za-z\d@#^$()!%*?&]{6,}$/;

    let allErrors = errors;

    values.forEach(([key, value]) => {
      if (!value) {
        allErrors[key] = "This field is required";
      } else {
        allErrors[key] = "";
      }
    });
    setErrors({ ...errors, ...allErrors });
    console.log(errors);

    if (Object.values(allErrors).some((value) => value)) {
      return;
    }

    if (!emailRegex.test(form.email)) {
      setErrors({ ...errors, email: "The email is invalid." });
      console.log("Email: All good");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrors({ ...errors, password: "The passwords don't match." });
      console.log("PW: All good");
      return;
    }

    if (!passwordRegex.test(form.password)) {
      setErrors({
        ...errors,
        password:
          "The password must contain at least 8 characters, one uppercare letter, one lowercase letter, one symbol and one number.",
      });
      console.log("passwordError");
      return;
    }

    setIsLoading(true);

    //Tip: Call api.user.register() method
    const newUser = await API.user.register({
      email: form.email,
      password: form.password,
    });

    if (newUser) {
      toast("Your account has been created.", { type: "success" });
      sessionStorage.setItem("id_token", newUser.idToken);
    } else {
      toast("The email is already in use", { type: "error" });
    }
    closeDialogue();
    setIsLoading(false);

    console.log(newUser);
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
                type="text"
                id="first-name"
                isIconVisible={true}
                style={{
                  backgroundColor: "transparent",
                }}
                iconChildren={
                  <UserIcon
                    style={{
                      backgroundColor: "transparent",
                      width: "20px",
                    }}
                  />
                }
              ></TextField>
            </span>
          </span>
          <span className="container__section">
            <label htmlFor="last-name">Last Name</label>
            <span className="container__input">
              <TextField
                type="text"
                id="last-name"
                isIconVisible={true}
                style={{
                  backgroundColor: "transparent",
                }}
                iconChildren={
                  <UserIcon
                    style={{
                      backgroundColor: "transparent",
                      width: "20px",
                    }}
                  />
                }
              ></TextField>
            </span>
          </span>
        </div>
        <span className="container__section">
          <label htmlFor="email">Email</label>
          <span className="container__input">
            <TextField
              onChange={(e) => handleChange("email", e.target.value)}
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
        </span>
        <span className="container__section">
          <label htmlFor="password">Create Password</label>
          <span className="container__input">
            <TextField
              onChange={(e) => handleChange("password", e.target.value)}
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
        </span>
        <span className="container__section">
          <label htmlFor="confirm-password">Confirm Password</label>
          <span className="container__input">
            <TextField
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              type="password"
              id="confirm-password"
              isIconVisible={true}
              style={{
                backgroundColor: "transparent",
              }}
              placeholder={"Please confirm your password"}
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
        </span>
        <Button variant="fill" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Create Account"}
        </Button>
        <span className="container__register">
          <h4>{"Already have an account?"}</h4>
          <span className="link" onClick={() => openDialogue("login")}>
            Sign Up
          </span>
        </span>
      </Container>
    </Modal>
  );
};

export default ModalSignUp;
