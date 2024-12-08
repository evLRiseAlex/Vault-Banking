import styled from "styled-components";

// General FAQ Container
export const FAQContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;

  @media (max-width: 1100px) {
    gap: 45px;
  }

  @media (max-width: 860px) {
    gap: 40px;
  }

  @media (max-width: 768px) {
    gap: 30px;
  }

  @media (max-width: 375px) {
    gap: 10px;
  }
`;

// FAQ Box with common container styles
export const FAQBox = styled.div`
  margin-top: 200px;
  width: 90%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  border: 2px solid #c9c9c9;
  border-radius: 20px;
  padding: 40px 0 20px 0;
  background-color: transparent;
  box-shadow: 0 0 30px var(--color-primary--dark);

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: 1100px) {
    padding: 35px 0 15px 0;
  }

  @media (max-width: 860px) {
    padding: 30px 0;
  }

  @media (max-width: 768px) {
    padding: 20px 0;
  }

  @media (max-width: 375px) {
    padding: 20px 0;
    margin-top: 150px;
  }
`;

// FAQ Help Section
export const FAQHelp = styled.div`
  font-size: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  gap: 24px;

  @media (max-width: 1100px) {
    font-size: 36px;
    padding: 45px;
  }

  @media (max-width: 860px) {
    font-size: 32px;
    padding: 40px;
  }

  @media (max-width: 768px) {
    font-size: 28px;
    padding: 30px;
  }

  @media (max-width: 375px) {
    font-size: 24px;
    padding: 20px;
  }
`;
