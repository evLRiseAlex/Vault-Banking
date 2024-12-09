import styled, { css } from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1001;
  transition: all 0.5s;
  ${({ isHidden }) =>
    isHidden &&
    css`
      visibility: hidden;
      opacity: 0;
    `}
`;

export default Container;
