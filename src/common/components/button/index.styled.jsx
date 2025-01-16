import styled from "styled-components";

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  appearance: none;
  font-size: var(--heading-size-1);
  line-height: var(--heading-line-1);
  font-weight: var(--text-weight-1);

  background: ${(props) => {
    switch (props.variant) {
      case "fill":
        return "var(--button-color-fill)";
      case "outline":
        return "none";
      case "delete":
        return "red";
      default:
        return "outline";
    }
  }};
  color: white;
  font-family: inherit;
  font-size: 1.6rem;
  border: 2px solid var(--color-primary--dark);
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.3s ease, border-color 0.3s ease,
    box-shadow 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 6px 24px;

  &:hover {
    opacity: 0.7;
    border-color: var(--color-primary-opaque--dark);
    color: var(--color-primary-opaque--dark);
  }

  &:focus {
    outline: none;
    box-shadow: var(--button-box-shadow);
  }

  @media (max-width: 1100px) {
    font-size: var(--heading-size-2);
    line-height: var(--heading-line-2);
    font-weight: var(--text-weight-2);
  }

  @media (max-width: 860px) {
    display: ${(props) => {
      switch (props.display) {
        case "none":
          return "none";
        case "flex":
          return "flex";
      }
    }};
  }
`;

export default Container;
