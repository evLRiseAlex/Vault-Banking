import styled from "styled-components";

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
  padding: 100px 50px 0;

  @media (max-width: 700px) {
    gap: 30px;
    padding: 100px 20px 0;
  }

  .homeText {
    max-width: 40vw;

    h1 {
      font-size: var(--heading-size-1);
      line-height: var(--heading-line-1);
      font-weight: var(--heading-weight-1);
      margin-bottom: 16px;
    }

    p {
      font-size: var(--text-size-1);
      line-height: var(--text-line-1);
      font-weight: var(--text-weight-1);
      margin-bottom: 10px;
    }

    .btnScrollTo {
      display: inline-block;
      background: none;
      font-size: 26px;
      font-family: inherit;
      font-weight: 500;
      color: rgb(169, 106, 199);
      border: none;
      border-bottom: 1px solid currentColor;
      padding-bottom: 2px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        opacity: 0.8;
      }
    }

    @media (max-width: 768px) {
      max-width: 50vw;
      h1 {
        font-size: var(--heading-size-2);
        line-height: var(--heading-line-2);
        font-weight: var(--heading-weight-2);
      }
      p {
        font-size: var(--text-size-2);
        line-height: var(--text-line-2);
        font-weight: var(--text-weight-2);
      }
      .btnScrollTo {
        font-size: var(--heading-size-2);
        line-height: var(--heading-line-2);
        font-weight: var(--heading-weight-2);
      }
    }
    @media (max-width: 500px) {
      max-width: 60vw;
    }
  }
`;

export const LineContainer = styled.div`
  margin-top: 2rem;
`;
