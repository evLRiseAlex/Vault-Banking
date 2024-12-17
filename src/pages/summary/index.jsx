import { useEffect, useState } from "react";
import { Container, Movement } from "./index.styled";
import { mockAccount } from "../../common/index.constants";

import PropTypes from "prop-types";
import StylingLine from "../../common/components/divider-line";

const Summary = () => {
  // Fallback for when userData is not loaded yet

  const calcBalance = () =>
    mockAccount.cards?.[0]?.movements.reduce(
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
      <p className="greeting">{`Welcome, ${mockAccount.displayName}`}</p>
      <div className="balance">
        <h4>Balance</h4>
        <div className="funds">
          <p>Funds:</p>
          <p>{calcBalance()}</p>
        </div>
      </div>
      <ul className="movements">
        {mockAccount.cards?.[0]?.movements
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
                      mockAccount.locale,
                      mockAccount.currency
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
                      mockAccount.locale,
                      mockAccount.currency
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
