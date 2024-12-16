import { useEffect, useState } from "react";
import { Container, Movement } from "./index.styled";

import PropTypes from "prop-types";
import StylingLine from "../../common/components/divider-line";

import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../index";

const Summary = () => {
  const [userData, setUserData] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    // Set up Firebase Auth listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        // Fetch user-specific data from Firestore
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
          console.log("User data fetched:", userDoc.data());
          setUserData(userDoc.data());
        } else {
          console.log("No such user data found!");
        }
      } else {
        console.log("No user is logged in.");
        setUserData(null); // Reset user data if no user is logged in
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [auth]);

  // Fallback for when userData is not loaded yet
  if (!userData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          fontSize: "80px",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  const currentAccount = userData;

  const calcBalance = () =>
    currentAccount.cards?.[0]?.movements.reduce(
      (accumulator, currentMovement) => accumulator + currentMovement,
      0 // Initial value for the accumulator
    );

  const formatCurrency = (value, locale, currency) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  return (
    <Container>
      <p className="greeting">{`Welcome, ${currentAccount.displayName}`}</p>
      <div className="balance">
        <h4>Balance</h4>
        <div className="funds">
          <p>Funds:</p>
          <p>{calcBalance()}</p>
        </div>
      </div>
      <ul className="movements">
        {currentAccount.cards?.[0]?.movements
          .slice()
          .reverse()
          .map((movement, index, array) =>
            movement > 0 ? (
              <>
                <div key={index} className="movement">
                  <Movement variant="fill">
                    <p>{array.length - index}: Deposit</p>
                  </Movement>
                  <li className="deposit">
                    {formatCurrency(
                      movement,
                      currentAccount.locale,
                      currentAccount.currency
                    )}
                  </li>
                </div>
                {array.length - index > 1 ? <StylingLine /> : null}
              </>
            ) : (
              <>
                <div key={index} className="movement">
                  <Movement variant="outline">
                    {array.length - index}: Withdrawal
                  </Movement>
                  <li className="withdrawal">
                    {formatCurrency(
                      movement,
                      currentAccount.locale,
                      currentAccount.currency
                    )}
                  </li>
                </div>
                {array.length - index > 1 ? <StylingLine /> : null}
              </>
            )
          )}
      </ul>
    </Container>
  );
};

Summary.propTypes = {
  variant: PropTypes.string,
};

export default Summary;
