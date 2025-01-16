import { Container, Movement } from "./index.styled";
// import { mockAccount } from "../../common/index.constants";
import API from "../../API";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import StylingLine from "../../common/components/divider-line";
import { Modal, ModalFirstLogin, TransferForm } from "./components";
import { Overlay, Button, TextField } from "../../common";
import { toast } from "react-toastify";

const Summary = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  // Fallback for when userData is not loaded yet
  const [userId, setUserId] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentMovements, setCurrentMovements] = useState([]);
  const [locale, setLocale] = useState("ro-RO");
  const [currency, setCurrency] = useState("RON");
  const [showConfirmPasswordModal, setShowConfirmPasswordModal] =
    useState(false);

  const [isConfirming, setIsConfirming] = useState(false); // To track the loading state of the button

  const fetchMovements = async () => {
    try {
      const card = await API.card.readCardById({ userID: userId });
      if (card && card.movements) {
        setCurrentMovements(card.movements);
      }
    } catch (error) {
      console.error("Error fetching movements:", error);
    }
  };

  const fetchUserData = async () => {
    const storedUserId = sessionStorage.getItem("userID");
    const storedIdToken = sessionStorage.getItem("id_token");

    if (storedIdToken) setIdToken(storedIdToken);
    console.log(idToken);
    if (storedUserId) {
      setUserId(storedUserId); // Update state with userId
      try {
        const card = await API.card.readCardById({ userID: storedUserId });
        const profile = await API.profile.readProfileById({
          userID: storedUserId,
        });

        if (card) {
          setLocale(card.locale);
          setCurrency(card.currency);
          setCurrentMovements(card.movements); // First login check and set currentMovements
        }
        if (profile) {
          setUserProfile(profile);
        }

        if (!card.movements || card.movements.length === 0) {
          setIsFirstLogin(true);
          await API.card.initializeMovements({ userID: storedUserId });
          const updatedCard = await API.card.readCardById({
            userID: storedUserId,
          });
          setCurrentMovements(updatedCard.movements);
        }
      } catch (error) {
        console.error("Error fetching card or profile:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const calcBalance = () =>
    currentMovements?.reduce(
      (accumulator, currentMovement) => accumulator + currentMovement.value,
      0 // Initial value for the accumulator
    );

  const formatCurrency = (value, locale, currency) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  const formatMovementValue = (value, locale, currency) => {
    const conversionRate = conversionRates[currency];
    return value * conversionRate; // Apply the conversion rate
  };

  const formatDate = (
    date,
    locale,
    options = { dateStyle: "medium", timeStyle: "medium" }
  ) => {
    if (!date) return ""; // If date is not provided, return empty string

    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
  };

  const handleCurrencyChange = async (event) => {
    const newCurrency = event.target.value; // Capture the new currency
    setCurrency(newCurrency); // Set the currency state

    // Determine the locale based on the selected currency
    let newLocale = "ro-RO"; // Default locale
    if (newCurrency === "EUR") {
      newLocale = "en-GB";
    } else if (newCurrency === "USD") {
      newLocale = "us-US";
    }

    setLocale(newLocale); // Set the locale state

    // Update the database with the new locale and currency
    try {
      await API.card.updateLocaleAndCurrency({
        userID: userId,
        locale: newLocale,
        currency: newCurrency,
      });
    } catch (error) {
      console.error("Error updating locale and currency:", error);
    }
  };

  const handleConfirmPassword = async () => {
    if (!userProfile) {
      console.error("User not found!");
      toast("Your password is invalid.", { type: "error" });
      setIsConfirming(false);
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
        try {
          const movementValue = amount / conversionRates[currency];
          const currentTransfer = await API.card.updateMovements({
            userID: userId,
            movement: -movementValue,
          });

          const destinationProfile = await API.profile.readProfileByIBAN({
            IBAN: recipient,
          });

          if (destinationProfile) {
            const destinationID = destinationProfile.userID;
            const destinationTransfer = await API.card.updateMovements({
              userID: destinationID,
              movement: movementValue,
            });
            console.log(currentTransfer);
            console.log(destinationTransfer);
          }
        } catch (error) {
          console.log(error);
        }
        setConfirmPassword("");
        await fetchMovements();

        toast("Your transfer was successful.", { type: "success" });

        setShowConfirmPasswordModal(false);
        setIsConfirming(false);
      }
    } catch (error) {
      console.error("Error verifying password.", error);
      setIsConfirming(false); // Reset loading state on error
      console.log(isConfirming);
    }
  };

  const conversionRates = {
    RON: 1,
    EUR: 0.2,
    USD: 0.21,
  };

  return (
    <Container>
      {isFirstLogin && (
        <>
          <ModalFirstLogin onClick={() => setIsFirstLogin(false)}>
            <h2>Welcome to Vault!</h2>
            <p>
              {`Welcome to Vault, your trusted partner for smart banking! We're
            thrilled to have you join our community. To help you get started,
            we've deposited 1000 RON into your account as a welcome gift. Feel
            free to explore our app's features designed to make managing your
            finances simple and secure. Your journey toward financial freedom
            starts here — let's make it exceptional together!`}
            </p>
          </ModalFirstLogin>
          <Overlay />
        </>
      )}
      <p className="greeting">
        {userProfile
          ? `Welcome ${userProfile.firstName} ${userProfile.lastName}`
          : ""}
      </p>

      <div className="currency-select">
        <label htmlFor="currency">Select Currency:</label>

        <select id="currency" value={currency} onChange={handleCurrencyChange}>
          <option value="RON">RON</option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
        </select>
      </div>

      <div className="balance">
        <h4>Summary</h4>
        <div className="funds">
          <p>Balance:</p>
          <p>
            {formatCurrency(
              formatMovementValue(calcBalance(), locale, currency),
              locale,
              currency
            )}
          </p>
        </div>
      </div>
      <ul className="movements">
        {currentMovements
          ?.slice()
          ?.reverse()
          ?.map((movement, index, array) => {
            const formattedValue = formatMovementValue(
              movement.value,
              locale,
              currency
            );
            return movement.value > 0 ? (
              <>
                <li key={index} className="movement">
                  <div className="flex-movement">
                    <Movement variant="fill">
                      <p>{array.length - index}: Deposit</p>
                    </Movement>
                    <div>{formatDate(movement.date, locale)}</div>
                  </div>
                  <div className="deposit">
                    {formatCurrency(formattedValue, locale, currency)}
                  </div>
                </li>
                {array.length - index > 1 ? <StylingLine /> : null}
              </>
            ) : (
              <>
                <li key={index} className="movement">
                  <div className="flex-movement">
                    <Movement variant="outline">
                      {array.length - index}: Withdrawal
                    </Movement>
                    <div>{formatDate(movement.date, locale)}</div>
                  </div>
                  <div className="withdrawal">
                    {formatCurrency(Math.abs(formattedValue), locale, currency)}
                  </div>
                </li>
                {array.length - index > 1 ? <StylingLine /> : null}
              </>
            );
          })}
      </ul>
      {showConfirmPasswordModal && (
        <>
          <Modal>
            <h4>Confirm Password</h4>
            <p
              style={{
                maxWidth: "500px",
              }}
            >
              Confirm your account password in order to proceed.
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
              variant="fill"
              disabled={isConfirming} // Disable button while verifying
            >
              Confirm
            </Button>
          </Modal>
          <Overlay />
        </>
      )}
      <TransferForm
        userId={userId}
        userProfile={userProfile}
        amount={amount} // Pass the amount state
        setAmount={setAmount} // Pass the setAmount function
        recipient={recipient} // Pass the recipient state
        setRecipient={setRecipient} // Pass the setRecipient function
        setShowConfirmPasswordModal={setShowConfirmPasswordModal}
        onClick={() => setShowConfirmPasswordModal(true)} // Pass the existing onClick handler
      />
    </Container>
  );
};

Summary.propTypes = {
  variant: PropTypes.string,
};

export default Summary;
