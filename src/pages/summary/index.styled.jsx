import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-top: 150px;

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
    align-self: flex-start;
    padding-left: 40px;
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
`;
