import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/logo.png'

// Crea un bottone con stili incorporati per didattica
const StyledNav = styled.nav`
  background-color: #26773a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem 2rem;
`;
const StyledImg = styled.img`
    height: 50px;
  width: 50px;
  background-repeat: no-repeat;
  background-position: center;
    `;
 const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.5rem; /* Spazio tra i vari elementi del menu */
  `
  const StyledLi = styled.li`
  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
}
    `   
export const Navbar = () => {
  return (
    <>
      <StyledNav>
            <StyledImg src={logo} alt="Logo " />
            react vegapp
        <StyledUl className="nav-links">
          <StyledLi>
            <Link to="/">Home</Link>
          </StyledLi>
            </StyledUl>
      </StyledNav>
    </>
  );
};
