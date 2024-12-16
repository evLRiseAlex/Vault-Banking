import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35vw;
  height: auto;
  background-color: var(--color-secondary--dark--alpha);
  border: 2px solid var(--color-primary--dark);
  /* border-radius: 25px; */
  padding: 20px 20px;
  box-shadow: 0 4rem 6rem rgba(0, 0, 0, 0.3);
  z-index: 1102;
  border-radius: 20px;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;

  .btn__modal {
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    width: 10%;
    align-self: flex-end;
    margin-bottom: 10px;
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
