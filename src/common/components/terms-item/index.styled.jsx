import styled, { css } from "styled-components";

const TermContainer = styled.li`
  display: flex;
  gap: 10px;
  flex-direction: column;
  transition: all 0.3s ease;
  border-radius: 20px;
  padding: 10px;
  transition: all 0.3s ease;
  border: ${({ isClicked }) => {
    return isClicked && `2px solid #c9c9c9`;
  }};
  div {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  button {
    transition: transform 0.3s ease;
    border: none;
    background: transparent;
    color: var(--color-primary-dark);
    cursor: pointer;
    ${({ isClicked }) =>
      isClicked &&
      css`
        transform: rotate(90deg);
      `}
  }

  h4 {
    font-size: var(--heading-size-2);
    font-weight: var(--heading-weight-1);
    line-height: var(--heading-line-1);
  }

  p {
    overflow-y: scroll;
    white-space: pre-wrap;
    transition: max-height 0.5s ease, opacity 0.5s ease, padding 0.3s ease;
    font-size: var(--text-size-1);
    line-height: var(--text-line-1);
    font-weight: var(--text-weight-1);
    ${({ isClicked }) => {
      if (isClicked) {
        return css`
          max-height: 500px;
          opacity: 1;
          padding: 12px 0px;
        `;
      } else if (!isClicked) {
        return css`
          max-height: 0px;
          opacity: 0;
          padding: 0px;
        `;
      }
    }}
  }

  @media (max-width: 768px) {
    h4 {
      font-size: var(--heading-size-2);
      font-weight: var(--heading-weight-2);
      line-height: var(--heading-line-2);
    }
    p {
      font-size: var(--text-size-2);
      line-height: var(--text-line-2);
      font-weight: var(--text-weight-2);
    }
  }
`;

export default TermContainer;
