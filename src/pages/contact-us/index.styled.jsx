import styled from "styled-components";

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  justify-content: center;
  padding: 120px 300px 100px;
  font-family: "Teko", sans-serif;
  margin-top: 100px;

  > h2 {
    font-size: var(--heading-size-1);
    line-height: var(--heading-line-1);
    font-weight: var(--heading-weight-1);
  }

  @media (max-width: 1100px) {
    padding: 100px 150px 80px;
    margin-top: 100px;

    > h2 {
      font-size: var(--heading-size-2);
      line-height: var(--heading-line-2);
      font-weight: var(--heading-weight-2);
    }
  }

  @media (max-width: 860px) {
    padding: 80px 100px 60px;
    margin-top: 100x;
  }

  @media (max-width: 768px) {
    padding: 60px 50px 40px;
    margin-top: 100px;
  }

  @media (max-width: 375px) {
    padding: 40px 20px 20px;
  }
`;

export const HelpContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 2px solid #c9c9c9;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 0 20px #c9c9c9;

  > h4 {
    font-size: var(--heading-size-1);
    line-height: var(--heading-line-1);
    font-weight: var(--heading-weight-1);
  }

  > p,
  ul li {
    font-size: var(--text-size-1);
    line-height: var(--text-line-1);
    font-weight: var(--text-weight-1);
  }

  a {
    color: rgb(169, 106, 199);
    cursor: pointer;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 1100px) {
    padding: 35px;

    > h4 {
      font-size: var(--heading-size-2);
      line-height: var(--heading-line-2);
      font-weight: var(--heading-weight-2);
    }

    > p,
    ul li {
      font-size: var(--text-size-2);
      line-height: var(--text-line-2);
      font-weight: var(--text-weight-2);
    }
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;

  h3 {
    font-size: var(--heading-size-1);
    line-height: var(--heading-line-1);
    font-weight: var(--heading-weight-1);
  }

  p {
    font-size: var(--text-size-1);
    line-height: var(--text-line-1);
    font-weight: var(--text-weight-1);
  }

  @media (max-width: 1100px) {
    padding: 30px;

    h3 {
      font-size: var(--heading-size-2);
      line-height: var(--heading-line-2);
      font-weight: var(--heading-weight-2);
    }

    > p {
      font-size: var(--text-size-2);
      line-height: var(--text-line-2);
      font-weight: var(--text-weight-2);
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const MapContainer = styled.div`
  border: 2px solid #c9c9c9;
  border-radius: 20px;
  box-shadow: 0 0 20px var(--color-primary--dark);
  margin-bottom: 40px;
  align-self: center;
  width: 90%;
  display: flex;
  justify-content: center;
  padding: 20px; /* Reduced to half */

  @media (max-width: 1100px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;
