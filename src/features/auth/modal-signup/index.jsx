import { Button, Modal, TextField } from "../../../common";
import Container from "./index.styled";
import EmailIcon from "../../../common/assets/mail-icon.svg?react";
import PasswordIcon from "../../../common/assets/password.svg?react";
import { useDialogue } from "../../../common/components/header";

const ModalSignUp = () => {
  const { openDialogue } = useDialogue();
  return (
    <Modal>
      <Container>
        <h2>Enter your account details</h2>
        <span className="container__section">
          <label htmlFor="email">Email</label>
          <span className="container__input">
            <TextField
              type="email"
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
        <Button variant="fill">Create Account</Button>
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
