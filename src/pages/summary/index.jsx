import { Container, Movement } from "./index.styled";
// import { mockAccount } from "../../common/index.constants";
import API from "../../API";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import StylingLine from "../../common/components/divider-line";
import {
  ModalConfirmPassword,
  ModalFirstLogin,
  TransferForm,
} from "./components";
import { Overlay } from "../../common";

const Summary = () => {
  // Fallback for when userData is not loaded yet
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [currentMovements, setCurrentMovements] = useState([]);
  const [locale, setLocale] = useState("ro-RO");
  const [currency, setCurrency] = useState("RON");

  const conversionRates = {
    RON: 1,
    EUR: 0.2,
    USD: 0.21,
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedUserId = sessionStorage.getItem("userID");
      if (storedUserId) {
        setUserId(storedUserId); // Update state with userId
        try {
          const card = await API.card.readCardById({ userID: storedUserId });
          console.log(card);
          const profile = await API.profile.readProfileById({
            userID: storedUserId,
          });
          if (card) {
            setLocale(() => card.locale);
            setCurrency(() => card.currency);

            console.log(card.locale);
            console.log(card.currency);
          }
          if (profile) {
            setUserProfile(() => profile);
            console.log(profile);
          }
          const cardMovements = card.movements;
          console.log(cardMovements);

          if (!cardMovements || cardMovements.length === 0) {
            // Call your method to initialize movements
            await API.card.initializeMovements({ userID: storedUserId });
            setIsFirstLogin(true);
            try {
              const card = await API.card.readCardById({
                userID: storedUserId,
              });
              const cardMovements = card.movements;
              console.log(card);
              setCurrentMovements(cardMovements);
            } catch (error) {
              console.error("Error fetching card movements:", error);
            }
          } else {
            setCurrentMovements(cardMovements);
          }
        } catch (error) {
          console.error("Error fetching card movements:", error);
        }
      }
    };
    console.log(currentMovements);

    fetchData();
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
      newLocale = "en-EN";
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

  return (
    <Container>
      {confirmPassword && (
        <>
          <ModalConfirmPassword>
            <h2>Confirm Password</h2>
            <p>{`Please validate your password`}</p>
          </ModalConfirmPassword>
        </>
      )}
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
          <Overlay></Overlay>
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
        <h4>Balance</h4>
        <div className="funds">
          <p>Funds:</p>
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
                <div key={index} className="movement">
                  <Movement variant="outline">
                    {array.length - index}: Withdrawal
                  </Movement>
                  <li className="withdrawal">
                    {formatCurrency(Math.abs(formattedValue), locale, currency)}
                  </li>
                </div>
                {array.length - index > 1 ? <StylingLine /> : null}
              </>
            );
          })}
      </ul>
      <TransferForm />
    </Container>
  );
};

Summary.propTypes = {
  variant: PropTypes.string,
};

export default Summary;
