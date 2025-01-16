import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: auto;
  background-color: var(--color-secondary--dark--alpha);
  border: 2px solid var(--color-primary--dark);
  /* border-radius: 25px; */
  padding: 30px 30px;
  box-shadow: 0 4rem 6rem rgba(0, 0, 0, 0.3);
  z-index: 1102;
  border-radius: 20px;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

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

  .flex-buttons {
    display: flex;
    justify-content: space-around;
    gap: 20px;
  }

  h4 {
    font-size: var(--heading-size-1);
  }

  p {
    font-size: var(--text-size-1);
  }

  .btn__modal {
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    width: 50%;
    margin-bottom: 10px;
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (max-width: 1100px) {
    width: 50vw;
  }

  @media (max-width: 768px) {
    width: 60vw;
  }

  @media (max-width: 600px) {
    width: 80vw;
  }
`;

export default Container;
