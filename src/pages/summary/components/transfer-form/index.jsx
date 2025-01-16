import Container from "./index.styled";
import PropTypes from "prop-types";
import { useState } from "react";
import { Button, TextField } from "../../../../common";
import API from "../../../../API";

const TransferForm = ({
  amount,
  setAmount,
  recipient,
  setRecipient,
  userProfile,
  onClick,
}) => {
  const [recipientError, setRecipientError] = useState("");
  const [recipientInfo, setRecipientInfo] = useState("");
  const [amountError, setAmountError] = useState("");

  const validateRecipient = async () => {
    const recipientPattern = /^RO\d{2}VAULT\d{10}$/; // Regex for format: RO(2 digits)VAULT(10 digits)
    if (!recipientPattern.test(recipient)) {
      setRecipientError("Invalid Bank Account");
    } else {
      // Check if IBAN exists via API
      try {
        const profile = await API.profile.readProfileByIBAN({
          IBAN: recipient,
        });
        if (!profile) {
          setRecipientError("This account doesn't exist.");
        } else if (recipient === userProfile.IBAN) {
          setRecipientError("You can't transfer to the same account."); // IBAN is valid and exists
        } else {
          setRecipientInfo(profile);
          setRecipientError("");
        }
      } catch (error) {
        console.error("Error validating IBAN:", error);
        setRecipientError("Error checking account existence.");
      }
    }
  };

  const validateAmount = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setAmountError("Sum must be a positive amount.");
    } else {
      setAmountError("");
    }
  };

  return (
    <Container>
      <h3>Transfer Funds</h3>
      <form className="form-container">
        <div>
          <label htmlFor="recipient">Recipient:</label>
          <div className="text-field">
            <TextField
              style={{
                backgroundColor: "transparent",
              }}
              type="text"
              id="recipient"
              placeholder="eg. RO99VAULT0123456789"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              onBlur={validateRecipient} // Validate on blur
              required
            />
          </div>
          {recipientError && <p className="error">{recipientError}</p>}
          {recipientInfo && recipient && !recipientError && (
            <div className="info">
              <h4>Recipient Info</h4>
              <p>{`First Name: ${recipientInfo.firstName}`}</p>
              <p>{`Last Name: ${recipientInfo.lastName}`}</p>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <div className="text-field">
            <TextField
              style={{
                backgroundColor: "transparent",
              }}
              placeholder="Enter your sum here"
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={validateAmount} // Validate on blur
              required
              min="0.01"
              step="0.01"
            />
          </div>
          {amountError && <p className="error">{amountError}</p>}
        </div>
        <Button
          variant="fill"
          type="button"
          onClick={async () => {
            await validateRecipient();
            validateAmount();
            if (!recipientError && !amountError && recipient && onClick) {
              onClick();
            }
          }}
        >
          Transfer
        </Button>
      </form>
    </Container>
  );
};

TransferForm.propTypes = {
  amount: PropTypes.string.isRequired,
  setAmount: PropTypes.func.isRequired,
  recipient: PropTypes.string.isRequired,
  setRecipient: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  userProfile: PropTypes.object,
};

export default TransferForm;
