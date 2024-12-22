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

  label {
    font-size: var(--text-size-1);
    margin-bottom: 5px;
  }
`;

export default Container;
