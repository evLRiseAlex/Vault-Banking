import Container from "./index.styled";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import API from "../../API";
import { Button, Overlay, TextField } from "../../common";
import Modal from "./modal";
import { toast } from "react-toastify";
import UserIcon from "../../common/assets/user-icon.svg?react";

const Profile = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isSummaryArrowClicked, setIsSummaryArrowClicked] = useState(false);

  const [cardDetails, setCardDetails] = useState(null);
  const [isCardArrowClicked, setIsCardArrowClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmPasswordModal, setShowConfirmPasswordModal] =
    useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirming, setIsConfirming] = useState(false); // To track the loading state of the button

  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false); // New state to track form visibility
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const storedUserId = sessionStorage.getItem("userID");
      const storedidToken = sessionStorage.getItem("id_token");
      if (storedidToken) {
        setIdToken(storedidToken);
      }
      if (storedUserId) {
        setUserId(storedUserId);
        try {
          const card = await API.card.readCardById({ userID: storedUserId });
          const profile = await API.profile.readProfileById({
            userID: storedUserId,
          });
          if (card) {
            setCardDetails(card);
          }
          if (profile) {
            setUserProfile(() => profile);
          }
        } catch (error) {
          console.error("Error fetching user profile.", error);
        } finally {
          setLoading(false); // Set loading to false after data is fetched
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
        setShowConfirmPasswordModal(false);
      }
    };

    if (showModal || showConfirmPasswordModal) {
      window.addEventListener("keydown", handleEscape);
    } else {
      window.removeEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showModal, showConfirmPasswordModal]);

  const navigate = useNavigate();

  const nameRegex = /^[a-zA-Z]+$/;

  const validateFirstName = () => {
    if (!firstName.trim()) {
      setFirstNameError(""); // Clear error if the field is empty
      return true; // Return true as no error for empty field
    } else if (!nameRegex.test(firstName.trim())) {
      setFirstNameError("First name should only contain letters.");
      return false;
    } else {
      setFirstNameError("");
      return true;
    }
  };

  const validateLastName = () => {
    if (!lastName.trim()) {
      setLastNameError(""); // Clear error if the field is empty
      return true; // Return true as no error for empty field
    } else if (!nameRegex.test(lastName.trim())) {
      setLastNameError("Last name should only contain letters.");
      return false;
    } else {
      setLastNameError("");
      return true;
    }
  };

  const deleteUser = async () => {
    try {
      if (userId && idToken) {
        await API.user.deleteUser({ idToken: idToken });
        await API.profile.deleteUserProfile({ userID: userId });
        await API.card.deleteCard({ userID: userId });
        await API.user.logout();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleConfirmPassword = async () => {
    if (!userProfile) {
      console.error("User not found!");
    }
    setIsConfirming(true); // Set loading state to true
    try {
      const result = await API.user.verifyPassword({
        email: userProfile.email,
        password: confirmPassword,
      });

      if (!result.email) {
        console.error("Password verification failed.");
        toast("Your password is invalid.", { type: "error" });
        setIsConfirming(false); // Reset loading state
      } else {
        await deleteUser();
        toast("Your account was deleted.", { type: "success" });
        setShowModal(false);
        setShowConfirmPasswordModal(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying password.", error);
      setIsConfirming(false); // Reset loading state on error
    }
  };
  const handleUpdateProfile = async () => {
    let isUpdated = false;

    if (firstName) {
      const isFirstNameValid = validateFirstName();
      if (isFirstNameValid) {
        try {
          await API.profile.updateProfileFirstName({
            firstName: firstName,
            userID: userId,
          });
          isUpdated = true;
        } catch (error) {
          console.error("Error updating first name:", error);
        }
      }
    }

    if (lastName) {
      const isLastNameValid = validateLastName();
      if (isLastNameValid) {
        try {
          await API.profile.updateProfileLastName({
            lastName: lastName,
            userID: userId,
          });
          isUpdated = true;
        } catch (error) {
          console.error("Error updating last name:", error);
        }
      }
    }

    if (isUpdated) {
      const profile = await API.profile.readProfileById({
        userID: userId,
      });
      if (profile) {
        setUserProfile(profile);
      }
      toast("Profile updated successfully!", { type: "success" });
      setFirstName(""); // Clear the first name text field
      setLastName(""); // Clear the last name text field
      setIsUpdateFormVisible(false); // Hide the update form after submission
    }
  };

  return (
    <Container>
      <p className="greeting">
        {userProfile
          ? `Welcome ${userProfile.firstName} ${userProfile.lastName}`
          : ""}
      </p>
      <div className="section-box">
        <h4>Summary</h4>
        <div className="update">
          <p
            className="point"
            onClick={() => {
              setIsSummaryArrowClicked(!isSummaryArrowClicked);
            }}
          >
            My Account
            <button
              className={`arrow ${isSummaryArrowClicked ? "rotated" : ""}`}
            >
              ◀
            </button>
          </p>
          <Button
            variant="fill"
            onClick={() => setIsUpdateFormVisible(!isUpdateFormVisible)}
          >
            Update
          </Button>
        </div>
        <div className={`update-form ${isUpdateFormVisible ? "visible" : ""}`}>
          <div className="flex-form">
            <div className="flex-column">
              <label htmlFor="first-name">First Name</label>
              <span className="container__input">
                <TextField
                  value={firstName}
                  placeholder={userProfile?.firstName || "Loading..."}
                  type="text"
                  id="first-name"
                  isIconVisible={true}
                  iconChildren={<UserIcon style={{ width: "20px" }} />}
                  style={{
                    backgroundColor: "transparent",
                  }}
                  onBlur={validateFirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </span>
              {firstNameError && <p className="error">{firstNameError}</p>}
            </div>
            <div className="flex-column">
              <label htmlFor="last-name">Last Name</label>
              <span className="container__input">
                <TextField
                  value={lastName}
                  placeholder={userProfile?.lastName || "Loading..."}
                  type="text"
                  id="last-name"
                  isIconVisible={true}
                  iconChildren={<UserIcon style={{ width: "20px" }} />}
                  style={{
                    backgroundColor: "transparent",
                  }}
                  onBlur={validateLastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </span>
              {lastNameError && <p className="error">{lastNameError}</p>}
            </div>
          </div>
          <Button
            variant="fill"
            className="summary-btn"
            onClick={() => handleUpdateProfile()}
          >
            Submit
          </Button>
        </div>

        <div
          className={`account-details ${
            isSummaryArrowClicked ? "visible" : ""
          }`}
        >
          <p>
            <span className="bold">IBAN:</span>{" "}
            {loading ? "Loading..." : `${userProfile?.IBAN || ""}`}
          </p>
          <p>
            <span className="bold">Account Holder:</span>{" "}
            {loading
              ? "Loading..."
              : `${userProfile?.firstName} ${userProfile?.lastName}`}{" "}
            {/* Use firstName and lastName */}
          </p>
          <p>
            <span className="bold">Email:</span>{" "}
            {loading ? "Loading..." : `${userProfile?.email || ""}`}
          </p>
          <p>
            <span className="bold">Bank:</span> {`VAULT`}
          </p>

          <p>
            <span className="bold">SWIFT/BIC Code:</span> {`VAULTROBU`}
          </p>
        </div>
      </div>
      <div className="section-box">
        <h4>Card Details</h4>
        <div
          className="card-container"
          onClick={() => setIsCardArrowClicked(!isCardArrowClicked)}
        >
          <div className="card">
            <div className="card-item">
              <img src="/vault-dark.png" alt="Logo" />
            </div>
          </div>
          <p>
            {loading
              ? "Loading..."
              : `**** ${cardDetails?.cardNumber?.slice(-4) || ""}`}
          </p>
          <button className={`arrow ${isCardArrowClicked ? "rotated" : ""}`}>
            ◀
          </button>
        </div>

        <div
          className={`account-details ${isCardArrowClicked ? "visible" : ""}`}
        >
          <p>
            <span className="bold">Card Number:</span>{" "}
            {loading ? "Loading..." : `${cardDetails?.cardNumber || ""}`}
          </p>
          <p>
            <span className="bold">Card Holder:</span>{" "}
            {loading
              ? "Loading..."
              : `${userProfile?.firstName} ${userProfile?.lastName}`}{" "}
            {/* Use firstName and lastName */}
          </p>
          <p>
            <span className="bold">CCV:</span>{" "}
            {loading ? "Loading..." : `${cardDetails?.cardCCV || ""}`}
          </p>
          <p>
            <span className="bold">Expiration Date:</span>{" "}
            {loading ? "Loading..." : `${cardDetails?.cardExpDate || ""}`}
          </p>

          <p>
            <span className="bold">Currency:</span>{" "}
            {loading ? "Loading..." : `${cardDetails?.currency || ""}`}
          </p>
        </div>
      </div>
      <Button variant="delete" onClick={() => setShowModal(true)}>
        Delete Account
      </Button>

      {showModal && (
        <>
          <Modal>
            <h4>Are you sure?</h4>
            <p>
              This process will delete your account permanently and all your
              data will be lost. Do you want to proceed?
            </p>
            <div className="flex-buttons">
              <Button
                className="btn__modal"
                variant="delete"
                onClick={() => {
                  setShowModal(false);
                  setShowConfirmPasswordModal(true);
                }}
              >
                Confirm
              </Button>
              <Button
                className="btn__modal"
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </Modal>
          <Overlay />
        </>
      )}

      {showConfirmPasswordModal && (
        <>
          <Modal>
            <h4>Confirm Password</h4>
            <p
              style={{
                maxWidth: "500px",
              }}
            >
              Confirm your account password in order to proceed. Know that your
              account will be deleted permanently afterwards, and all available
              funds will be lost.
            </p>
            <span className="container-input">
              <TextField
                style={{
                  backgroundColor: "transparent",
                }}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isConfirming) {
                    handleConfirmPassword();
                  }
                }}
              ></TextField>
            </span>
            <Button
              variant="delete"
              onClick={handleConfirmPassword}
              disabled={isConfirming} // Disable button while verifying
            >
              Confirm
            </Button>
          </Modal>
          <Overlay />
        </>
      )}
    </Container>
  );
};

export default Profile;
