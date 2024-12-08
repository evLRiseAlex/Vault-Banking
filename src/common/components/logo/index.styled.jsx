import styled from "styled-components";

const Container = styled.div`
  display: none;
  position: absolute;
  left: 50;
  right: 50;
  top: 24px;
  img {
    width: 36px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export default Container;
