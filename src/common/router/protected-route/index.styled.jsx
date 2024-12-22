import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .loader {
    width: 64px;
    height: 44px;
    position: relative;
    border: 5px solid #fff;
    border-radius: 8px;
  }
  .loader::before {
    content: "";
    position: absolute;
    border: 5px solid #fff;
    width: 32px;
    height: 28px;
    border-radius: 50% 50% 0 0;
    left: 50%;
    top: 0;
    transform: translate(-50%, -100%);
  }
  .loader::after {
    content: "";
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 16px 0 #fff, -16px 0 #fff;
    animation: flash 0.5s ease-out infinite alternate;
  }

  @keyframes flash {
    0% {
      background-color: rgba(255, 255, 255, 0.25);
      box-shadow: 16px 0 rgba(255, 255, 255, 0.25),
        -16px 0 rgba(255, 255, 255, 1);
    }
    50% {
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 16px 0 rgba(255, 255, 255, 0.25),
        -16px 0 rgba(255, 255, 255, 0.25);
    }
    100% {
      background-color: rgba(255, 255, 255, 0.25);
      box-shadow: 16px 0 rgba(255, 255, 255, 1),
        -16px 0 rgba(255, 255, 255, 0.25);
    }
  }
`;

export default Container;
