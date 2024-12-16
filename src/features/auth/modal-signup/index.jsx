import { Button, Modal, TextField } from "../../../common";
import Container from "./index.styled";

import EmailIcon from "../../../common/assets/mail-icon.svg?react";
import PasswordIcon from "../../../common/assets/password.svg?react";
import UserIcon from "../../../common/assets/user-icon.svg?react";

import { useEffect } from "react";
import { useDialogue } from "../../../common/components/header";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../index"; // Import Firestore instance
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const ModalSignUp = () => {
  const { openDialogue, closeDialogue } = useDialogue();
  const auth = getAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target["confirm-password"].value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("User registered:", user);

      // Now safely build userData after user creation
      const userData = {
        email: user.email,
        cards: [
          {
            cardNumber: Array(4)
              .fill(0)
              .map(() => Math.floor(1000 + Math.random() * 9000))
              .join(" "),
            cardExpDate: "",
            cardName: `${user.displayName || "User"}`, // Fallback to displayName
            CCV: Math.floor(100 + Math.random() * 900),
          },
        ],
        createdAt: new Date().toISOString(),
        fullName: {
          firstName: "", // Use defaults as needed
          lastName: "",
        },
      };

      // Create a document in the 'users' collection with the UID as the document ID
      await setDoc(doc(db, "users", user.uid), userData);

      console.log("User data added to Firestore!");

      closeDialogue(); // Close the modal
      alert("Registration successful!");
    } catch (error) {
      console.error("Error registering user:", error);
      alert(error.message); // Display error message to user
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is authenticated:", user);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Modal>
      <Container onSubmit={handleSignUp}>
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
