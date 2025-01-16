import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 40px;
  margin-top: 175px;

  .update-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .info {
  }

  .error {
    color: red;
  }
  .summary-btn {
    width: 100%;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .flex-form {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .update-form {
    font-size: var(--text-size-1);
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transition: max-height 0.5s ease, opacity 0.5s ease, visibility 0s 0.5s; /* Visibility changes after transition ends */

    &.visible {
      margin-top: 15px;
      max-height: 500px;
      opacity: 1;
      visibility: visible;
      transition: max-height 0.5s ease, opacity 0.5s ease, visibility 0s;
    }
  }

  .account-details {
    font-size: var(--text-size-1);
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transition: max-height 0.5s ease, opacity 0.5s ease, visibility 0s 0.5s; /* Visibility changes after transition ends */

    &.visible {
      margin-top: 15px;
      max-height: 500px;
      opacity: 1;
      visibility: visible;
      transition: max-height 0.5s ease, opacity 0.5s ease, visibility 0s;
    }
  }

  .container-input {
    border: 2px solid var(--color-primary--dark);
    transition: border 0.3s ease, box-shadow 0.3s ease;
    padding: 0px 10px;
    border-radius: 10px;
    &:focus-within {
      box-shadow: 0px 0px 20px var(--button-color-fill);
      caret-color: rgba(201, 153, 255);
      border: 2px solid var(--button-color-fill);
    }
  }

  input {
    transition: border 0.3s ease;
    &::placeholder {
      font-size: var(--text-size-1);
      line-height: var(--text-line-1);
      font-weight: var(--text-weight-1);
    }
  }

  .card {
    border: 2px solid #c9c9c9;
    border-radius: 20px;
    box-shadow: 0 0 20px var(--color-primary--dark);
    padding: 10px;
  }

  .card-item {
    width: 200px;
    height: 120px;
    border-radius: 12px;
    background-image: var(--card-background);
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 12px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

    img {
      width: 40%;
    }
  }

  .card-container {
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 20px;
  }

  .arrow {
    background-color: transparent;
    margin-left: 5px;
    color: #c9c9c9;
    border: none;
    transition: transform 0.3s ease-in-out; /* Smooth transition for rotation */
    &.rotated {
      transform: rotate(-90deg);
    }
  }

  .update {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .section-box {
    display: flex;
    flex-direction: column;
    border: 2px solid #c9c9c9;
    border-radius: 20px;
    padding: 20px;
    width: 50vw;
    font-size: var(--text-size-1);
    line-height: var(--text-line-1);
    font-weight: var(--text-weight-1);
  }

  .greeting {
    font-size: var(--heading-size-1);
    line-height: var(--heading-line-1);
    font-weight: var(--heading-weight-1);
  }

  .point {
    cursor: pointer;
  }

  .bold {
    font-weight: 700;
  }

  @media (max-width: 1100px) {
    margin-top: 150px;
    .section-box {
      width: 60vw;
    }
  }

  @media (max-width: 768px) {
    .card-item {
      width: 140px;
      height: 80px;
    }
    .section-box {
      width: 70vw;
      font-size: var(--text-size-2);
      line-height: var(--text-line-2);
      font-weight: var(--text-weight-2);
      p {
        font-size: var(--text-size-2);
      }
    }
    .greeting {
      font-size: var(--heading-size-2);
      line-height: var(--heading-line-2);
      font-weight: var(--heading-weight-2);
    }
    button {
      font-size: var(--text-size-2);
    }
  }

  @media (max-width: 600px) {
    .section-box {
      width: 80vw;
    }
  }

  @media (max-width: 500px) {
    .section-box {
      width: 90vw;
    }
  }
`;

export default Container;
