import styled from "styled-components";

export const QuestionContainer = styled.li`
  margin-left: 10%;
  margin-right: 10%;
  background-color: rgba(70, 1, 150, 0.527);
  padding: 16px;
  border-radius: 20px;
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  list-style-type: none;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h4 {
    font-size: var(--heading-size-1);
    font-weight: var(--text-weight-1);
    line-height: var(--heading-line-1);
    padding: 0px 10px;
  }

  p {
    transition: max-height 0.5s ease, opacity 0.5s ease, padding 0.3s ease;
    font-size: var(--text-size-1);
    line-height: var(--text-line-1);
    font-weight: var(--text-weight-1);

    &.hidden {
      max-height: 0;
      opacity: 0;
      padding: 0;
    }

    &.visible {
      max-height: 500px;
      opacity: 1;
      padding: 12px 0px;
    }
  }

  @media (max-width: 1100px) {
    h4 {
      font-size: var(--heading-size-2);
      font-weight: var(--text-weight-2);
      line-height: var(--heading-line-2);
    }
    p {
      font-size: var(--text-size-2);
      line-height: var(--text-line-2);
      font-weight: var(--text-weight-2);
    }
  }
`;
