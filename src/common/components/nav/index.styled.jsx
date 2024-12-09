import styled from "styled-components";

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Teko";
  font-size: var(--heading-size-1);
  line-height: var(--heading-line-1);
  font-weight: var(--text-weight-1);

  ul {
    display: flex;
    list-style-type: none;
    gap: 48px;
  }

  a {
    text-decoration: none;
    color: var(--color-primary--dark);
    transition: all 0.3s ease;
  }

  a:hover {
    text-decoration: underline;
    text-shadow: var(--text-shadow);
    cursor: pointer;
  }

  @media (max-width: 1100px) {
    font-size: var(--heading-size-2);
    line-height: var(--heading-line-2);
    font-weight: var(--text-weight-2);
  }

  @media (max-width: 768px) {
    ul {
      font-size: 20px;
      padding: 10px;
      gap: 30px;
    }
  }

  ${({ media }) =>
    media &&
    `
    @media (max-width: 768px) {
      ul {
        flex-direction: column;
        list-style-type: circle;
      }
    }
  `}
`;

export default Container;
