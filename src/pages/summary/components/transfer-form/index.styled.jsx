import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 2px solid #c9c9c9;
  border-radius: 16px;
  width: 50vw;
  background-color: transparent;

  h3 {
    font-size: var(--heading-size-2);
    font-weight: var(--heading-weight-2);
    line-height: var(--heading-height-2);
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .info {
    margin-top: 10px;
  }

  .error {
    color: red;
    margin-top: 10px;
  }

  div {
    .text-field {
      width: 100%;
      height: 100%;
      appearance: none;
      outline: none;
      border: 2px solid #c9c9c9;
      padding: 10px;
      border-radius: 10px;

      &,
      &::placeholder {
        color: var(--heading-color);
        font-size: var(--text-size-1);
        line-height: var(--text-line-1);
        font-weight: var(--text-weight-1);
      }
      &::placeholder {
        opacity: 0.5s;
        font-family: "Teko";
      }
    }
  }

  margin-bottom: 40px;

  label {
    font-size: var(--text-size-1);
    margin-bottom: 5px;
  }

  @media (max-width: 1000px) {
    width: 60vw;
  }

  @media (max-width: 800px) {
    width: 80vw;
    label {
      font-size: var(--text-size-2);
    }
    #recipient,
    #amount {
      &::placeholder {
        font-size: 16px;
      }
    }
    button {
      font-size: var(--text-size-2);
    }
  }

  @media (max-width: 500px) {
    width: 95vw;
  }

  @media (max-width: 375px) {
    width: 95vw;
  }
`;

export default Container;
