import styled, { css } from "styled-components";

export const Container = styled.div`
  visibility: hidden;
  position: absolute;
  top: 132px;
  right: 0;
  opacity: 0;
  padding: 10px 40px;
  border-bottom-left-radius: 20px;
  background-color: var(--color-secondary--dark--alpha);
  transition: background-color 0.6s ease, opacity 0.6s ease-in-out,
    visibility 0s linear 0.6s;
  z-index: 1000;

  ${({ isArrowClicked }) =>
    isArrowClicked &&
    css`
      visibility: visible;
      opacity: 1;
      transition: background-color 0.6s ease-in-out, opacity 0.6s ease-in-out,
        visibility 0s linear 0s;
    `}
  @media (max-width: 1100px) {
    top: 116px;
    right: 0;
  }

  @media (max-width: 768px) {
    top: 90px;
    right: 0;
  }

  ol {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }

  li {
    font-size: var(--heading-size-2);
    line-height: var(--heading-line-2);
    font-weight: var(--text-weight-2);
    padding: 10px;

    @media (max-width: 1100px) {
      font-size: 20px;
      padding: 10px;
      gap: 10px;
    }
  }

  a {
    text-decoration: none;
    color: #c9c9c9;

    &:hover {
      text-decoration: underline;
    }
  }

  .logout {
    color: rgb(169, 106, 199);
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 1100px) {
  }
`;
