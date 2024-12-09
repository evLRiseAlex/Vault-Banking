import styled from "styled-components";

export const CardWrapper = styled.div`
  border: 2px solid #c9c9c9;
  border-radius: 50px;
  box-shadow: 0 0 30px var(--color-primary--dark);
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1100px) {
    border-radius: 25px;
    padding: 20px;
  }

  @media (max-width: 900px) {
    border-radius: 25px;
    padding: 20px;
    margin-bottom: 30px;
  }

  @media (max-width: 375px) {
    border-radius: 25px;
    padding: 15px;
  }
`;

export const CardContainer = styled.div`
  width: 450px;
  height: 300px;
  border-radius: 28px;
  background-image: var(--card-background);
  background-size: cover;
  background-position: center;
  transition: background-image 0.6s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

  img.logo {
    align-self: flex-end;
    width: 130px;
  }

  img.chip {
    width: 60px;
    margin-top: 40px;
  }

  h5 {
    font-family: "Poppins", sans-serif;
    font-weight: 200;
    transition: opacity 0.3s ease-in-out;

    &:nth-of-type(1) {
      font-size: 36px;
      opacity: var(--text-opacity);
    }

    &:nth-of-type(2) {
      font-size: 24px;
      align-self: flex-end;
    }
  }

  div {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: "Poppins", sans-serif;
    font-size: 20px;

    p {
      margin: 0;
    }

    h5 {
      font-size: 20px;
    }
  }

  @media (max-width: 1100px) {
    width: 340px;
    height: 210px;
    border-radius: 14px;
    padding: 20px;

    img.logo {
      width: 90px;
    }

    img.chip {
      width: 50px;
      margin-top: 20px;
    }

    h5 {
      &:nth-of-type(1) {
        font-size: 26px;
      }

      &:nth-of-type(2) {
        font-size: 16px;
      }
    }

    div {
      font-size: 16px;

      h5 {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 500px) {
    width: 250px;
    height: 140px;
    border-radius: 14px;
    padding: 10px;

    img.logo {
      width: 60px;
    }

    img.chip {
      width: 35px;
    }

    h5 {
      &:nth-of-type(1) {
        font-size: 16px;
      }

      &:nth-of-type(2) {
        font-size: 10px;
      }
    }

    div {
      font-size: 8px;

      h5 {
        font-size: 8px;
      }
    }
  }
`;
