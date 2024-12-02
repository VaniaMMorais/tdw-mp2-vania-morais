import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #e62429;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  font-family: "Comic Sans MS", "Comic Neue", sans-serif;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px #000;
  text-transform: uppercase;
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Links = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
`;

const LinkItem = styled.li`
  a {
    font-size: 1.5rem;
    color: #fff;
    text-decoration: none;
    transition:
      color 0.3s ease,
      transform 0.3s ease;
    text-shadow: 2px 2px #000;
    &:hover {
      color: #ffd700; /* Amarelo estilo comic */
      transform: scale(1.1);
    }
  }
`;

function Navbar() {
  return (
    <NavbarContainer>
      <Logo>
        <Link to="/">Marvel Comics</Link>
      </Logo>
      <Links>
        <LinkItem>
          <Link to="/">Home</Link>
        </LinkItem>
        <LinkItem>
          <Link to="/favorites">Favorites</Link>
        </LinkItem>
        <LinkItem>
          <Link to="/about">About</Link>
        </LinkItem>
      </Links>
    </NavbarContainer>
  );
}

export default Navbar;
