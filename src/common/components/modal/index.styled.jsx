import styled, { css } from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35vw;
  height: 65vh;
  background-color: var(--color-secondary--dark--alpha);
  border: 2px solid var(--color-primary--dark);
  /* border-radius: 25px; */
  padding: 5rem 6rem;
  box-shadow: 0 4rem 6rem rgba(0, 0, 0, 0.3);
  z-index: 1002;
  transition: all 0.5s;
  ${({ isHidden }) =>
    isHidden &&
    css`
      visibility: hidden;
      opacity: 0;
    `}
  @media (max-width: 1100px) {
    width: 50vw;
  }

  @media (max-width: 768px) {
    width: 60vw;
  }

  @media (max-width: 600px) {
    width: 70vw;
    height: 60vh;
  }
`;

export default Container;
