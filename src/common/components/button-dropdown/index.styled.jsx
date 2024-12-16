import styled, { css } from "styled-components";

export const Container = styled.button`
  background-color: transparent;
  outline: none;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-primary-dark);
  transform: rotate(0deg); // Default rotation

  ${({ isArrowClicked }) =>
    isArrowClicked &&
    css`
      transform: rotate(-90deg); // Rotate when clicked
    `}

  transition: transform 0.3s ease-in-out; // Smooth rotation
`;
