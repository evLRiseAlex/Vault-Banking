import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  border-radius: 8px;
  border: 1px solid
    ${(props) => {
      if (props.isErrorVisible) return "var(--error-color)";
      else return "var(--border-color)";
    }};
  justify-content: space-between;
  font-family: "Instrument Sans", sans-serif;

  div {
    display: flex;
    align-items: center;
    gap: 12px;

    input {
      width: 100%;
      height: 100%;
      appearance: none;
      outline: none;
      border: none;

      &,
      &::placeholder {
        color: var(--heading-color);
        font-size: var(--text-size-1);
        line-height: var(--text-line-1);
        font-weight: var(--text-weight-1);
      }
      &::placeholder {
        opacity: 0.5s;
      }
    }
  }

  p {
    color: var(--error-color);
    font-size: var(--text-size-2);
    line-height: var(--text-line-2);
    font-weight: var(--text-weight-2);
  }

  &:focus-within {
    caret-color: var(--app-color-1);
    border: 1px solid
      ${(props) => {
        if (props.isErrorVisible) return "var(--error-color)";
        else return "var(--app-color-1)";
      }};
  }
`;

export default Container;
