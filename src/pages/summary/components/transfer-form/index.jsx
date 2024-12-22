import Container from "./index.styled";
import PropTypes from "prop-types";
import { useState } from "react";
import { Button, TextField } from "../../../../common";

const TransferForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount: parseFloat(amount), recipient });
    setAmount("");
    setRecipient("");
  };

  return (
    <Container>
      <h3>Transfer Funds</h3>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recipient">Recipient:</label>
          <div className="text-field">
            <TextField
              style={{
                backgroundColor: "transparent",
              }}
              type="text"
              id="recipient"
              placeholder="eg vault@email.com"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
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
              required
              min="0.01"
              step="0.01"
            />
          </div>
        </div>
        <Button variant="fill" type="submit">
          Transfer
        </Button>
      </form>
    </Container>
  );
};

TransferForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TransferForm;
