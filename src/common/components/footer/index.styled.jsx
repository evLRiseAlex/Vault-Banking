import styled from "styled-components";

export const FooterContainer = styled.div`
  background-color: var(--color-secondary--dark--alpha);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  z-index: 100;
  position: relative;

  @media (max-width: 400px) {
    a {
      font-size: var(--text-size-2);
    }
  }

  img {
    width: 50px;
    margin-top: 25px;
    transition: width 0.3s ease;

    @media (max-width: 1100px) {
      width: 45px;
      margin-top: 20px;
    }

    @media (max-width: 768px) {
      width: 36px;
      margin-top: 15px;
    }
  }
`;
