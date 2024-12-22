import styled from "styled-components";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: var(--color-primary--dark);

  .error-message {
    color: red;
    font-size: var(--text-size-1);
    line-height: var(--text-line-1);
    font-weight: var(--text-weight-1);
    margin-top: 5px;
  }

  label {
    font-size: var(--text-size-1);
    line-height: var(--text-line-1);
    font-weight: var(--text-weight-1);
  }

  .container__section {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .container__name {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    gap: 20px; /* Adds space between the two fields */
  }

  .container__input {
    border: 2px solid var(--color-primary--dark);
    transition: border 0.3s ease, box-shadow 0.3s ease;
    padding: 0px 10px;
    border-radius: 5px;
    &:focus-within {
      box-shadow: 0px 0px 20px var(--button-color-fill);
      caret-color: rgba(201, 153, 255);
      border: 2px solid var(--button-color-fill);
    }
  }

  input {
    transition: border 0.3s ease;
    &::placeholder {
      font-size: var(--text-size-1);
      line-height: var(--text-line-1);
      font-weight: var(--text-weight-1);
    }
  }

  .container__register {
    align-self: center;
    font-size: var(--text-size-1);
    line-height: var(--text-line-1);
    display: flex;
    gap: 10px;

    h4 {
      font-weight: 400;
    }
  }

  .link {
    color: rgba(201, 153, 255);
    font-size: var(--text-size-1);
    line-height: var(--text-line-1);
    font-weight: 700;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      text-shadow: var(--text-shadow);
      text-decoration: underline;
    }
  }

  @media (max-width: 600px) {
    h2 {
      font-size: var(--heading-size-2);
      line-height: var(--heading-line-2);
      font-weight: var(--heading-weight-2);
    }

    label,
    button,
    .link,
    h4,
    #email,
    #password {
      font-size: var(--text-size-2);
      line-height: var(--text-line-2);
      font-weight: var(--text-weight-2);
    }

    input::placeholder {
      font-size: var(--text-size-2);
      line-height: var(--text-line-2);
      font-weight: var(--text-weight-2);
    }
  }
`;

export default Container;
