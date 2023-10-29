import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Header = () => {
  return (
    <StyledNav>
      <div className="menu">
        <Link to="/">JOY-LOG</Link>
      </div>
      <div className="menu">
        <Link activeClassName="active" to="/posts">
          posts
        </Link>
        <Link activeClassName="active" to="/about">
          about
        </Link>
      </div>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: var(--spacing-5) 0;

  .menu {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: var(--spacing-3);
  }

  a {
    position: relative;
    text-decoration: none;
    color: var(--color-heading-black);
    font-weight: var(--fontWeight-medium);
  }

  a::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 1px;
    left: 0;
    background: var(--color-heading-black);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s;
  }

  a:hover::before {
    transform: scaleX(1);
  }

  .active::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 1px;
    left: 0;
    background: var(--color-heading-black);
  }
`;

export default Header;
