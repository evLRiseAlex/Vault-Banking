import styled, { css } from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
  transition: background-color 0.6s ease;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 40px;
  width: 100%;

  .greeting {
    font-size: var(--heading-size-2);
    line-height: var(--heading-line-2);
    font-weight: var(--text-weight-2);

    @media (max-width: 900px) {
      display: none;
    }
  }

  .user {
    width: 50px;
    height: 100%;

    @media (max-width: 768px) {
      width: 40px;
    }
  }

  .user-info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .icon-divider {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 2px solid #c9c9c9;
    padding: 0px 6px;
    border-radius: 10px;

    @media (max-width: 600px) {
      gap: 5px;
      padding: 0px 4px;
      border-radius: 8px;
    }
  }

  ${({ isScrolled }) =>
    isScrolled &&
    css`
      background-color: var(--color-secondary--dark--alpha);
    `}

  ${({ isArrowClicked }) =>
    isArrowClicked &&
    css`
      background-color: var(--color-secondary--dark--alpha);
    `}

  ${({ isMenuOpen }) =>
    isMenuOpen &&
    css`
      background-color: var(--color-secondary--dark--alpha);
    `}

  @media (max-width: 1100px) {
    padding: 32px;
  }

  @media (max-width: 768px) {
    padding: 24px;
    border-bottom-left-radius: 0px;
  }
`;

export const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 20px;
  cursor: pointer;
  z-index: 1100;

  @media (max-width: 768px) {
    display: flex;
  }

  ${({ isMenuOpen }) =>
    isMenuOpen &&
    css`
      span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
      }
    `}
`;

export const HamburgerLine = styled.span`
  display: block;
  width: 100%;
  height: 3px;
  background-color: var(--color-primary--dark);
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
`;

export const NavLinksContainer = styled.nav`
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    visibility: hidden;
    position: absolute;
    top: 90px;
    left: 0;
    opacity: 0;
    padding: 20px;
    border-bottom-right-radius: 20px;
    background-color: var(--color-secondary--dark--alpha);
    transition: background-color 0.6s ease, opacity 0.6s ease-in-out,
      visibility 0s linear 0.6s;
    z-index: 1000;

    ${({ isMenuOpen }) =>
      isMenuOpen &&
      css`
        visibility: visible;
        opacity: 1;
        transition: background-color 0.6s ease-in-out, opacity 0.6s ease-in-out,
          visibility 0s linear 0s;
      `}
  }
`;

export const NavLeft = styled.div`
  display: flex;
  gap: 40px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;
