import { Button, Modal, TextField } from "../../../common";
import Container from "./index.styled";
import EmailIcon from "../../../common/assets/mail-icon.svg?react";
import PasswordIcon from "../../../common/assets/password.svg?react";
import { useDialogue } from "../../../common/components/header";

const ModalLogIn = () => {
  const { openDialogue } = useDialogue();
  return (
    <Modal>
      <Container>
        <h2>Please Log In to continue</h2>
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
          <label htmlFor="password">Password</label>
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
        <Button variant="fill">Login</Button>
        <span className="container__register">
          <h4>{"Don't have an account yet?"}</h4>
          <span
            className="link"
            onClick={() => {
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
