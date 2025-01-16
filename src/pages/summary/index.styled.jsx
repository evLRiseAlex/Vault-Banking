import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-top: 132px;

  .point {
    cursor: pointer;
  }

  .bold {
    font-weight: 700;
  }

  .container__input {
    border: 2px solid var(--color-primary--dark);
    transition: border 0.3s ease, box-shadow 0.3s ease;
    padding: 0px 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    &:focus-within {
      box-shadow: 0px 0px 10px var(--button-color-fill);
      caret-color: rgba(201, 153, 255);
      border: 2px solid var(--button-color-fill);
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

  .summary-arrow {
    background-color: transparent;
    margin-left: 5px;
    color: #c9c9c9;
    border: none;
    transition: transform 0.3s ease-in-out; /* Smooth transition for rotation */
    &.rotated {
      transform: rotate(-90deg);
    }
  }

  .currency-select {
    display: flex;
    gap: 10px;

    label {
      font-size: var(--text-size-1);
    }
  }

  #currency {
    background-color: var(--button-color-fill);
    color: #c9c9c9;
    border-radius: 5px;
    font-weight: 700;
    font-size: var(--text-size-2);

    &:focus {
      background-color: var(--button-color-fill);
    }

    option {
      font-weight: 700;
    }
  }

  .flex-movement {
    display: flex;
    gap: 20px;
  }

  .fade-in-out {
    animation: fadeInOut 1.5s ease-out infinite;
  }

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .greeting {
    font-size: var(--heading-size-1);
    line-height: var(--heading-line-1);
    font-weight: var(--heading-weight-1);
  }

  .balance {
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

  .funds {
    display: flex;
    justify-content: space-between;
  }

  .movements {
    list-style: none;
    font-size: var(--text-size-1);
    line-height: var(--text-line-1);
    font-weight: var(--text-weight-1);
    width: 50vw;
    max-height: 45vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 40px;
    border: 2px solid #c9c9c9;
    padding: 20px 20px;
    border-radius: 16px;
    justify-content: space-evenly;
  }

  .movement {
    display: flex;
    gap: 20px;
    justify-content: flex-start;
    align-items: center;
    justify-content: space-between;
  }

  .deposit {
    color: lightgreen;
  }

  .withdrawal {
    color: red;
  }
  @media (max-width: 1000px) {
    .movements {
      width: 60vw;
      gap: 32px;
    }
    .balance {
      width: 60vw;
    }
  }

  @media (max-width: 800px) {
    .movements {
      width: 80vw;
      gap: 24px;
      font-size: var(--text-size-2);
      line-height: var(--text-line-2);
      font-weight: var(--text-weight-2);
    }
    .balance {
      width: 80vw;
      font-size: var(--text-size-2);
      line-height: var(--text-line-2);
      font-weight: var(--text-weight-2);
    }
    .currency-select {
      label {
        font-size: var(--text-size-2);
      }
      #currency {
        option {
          font-size: var(--text-size-2);
        }
      }
    }
  }

  @media (max-width: 500px) {
    .movements {
      width: 95vw;
      gap: 16px;
    }
    .balance {
      width: 95vw;
    }
  }

  @media (max-width: 375px) {
    .movements {
      width: 95vw;
    }
    .balance {
      width: 95vw;
    }
  }
`;

export const Movement = styled.div`
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--text-size-2);
  line-height: var(--text-line-2);
  font-weight: var(--text-weight-2);

  background-color: ${(props) => {
    switch (props.variant) {
      case "fill":
        return "var(--button-color-fill)";
      case "outline":
        return "none";
      default:
        return "outline";
    }
  }};
  color: white;
  font-family: inherit;
  border: 2px solid var(--color-primary--dark);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 2px 4px;
  @media (max-width: 800px) {
    font-size: 14px;
  }
`;
