import styled from "styled-components";

const Container = styled.div`
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 150px;
  }

  @media (max-width: 1100px) {
    img {
      width: 100px;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export default Container;
