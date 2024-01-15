import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.div`
  color: white;
  padding: 15px;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const CoolButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavLinks>
        <StyledLink to="/work">
          <CoolButton>Работы</CoolButton>
        </StyledLink>
        <StyledLink to="/departments">
          <CoolButton>Отделы</CoolButton>
        </StyledLink>
        <StyledLink to="/contract">
          <CoolButton>Договоры</CoolButton>
        </StyledLink>
        <StyledLink to="/employee">
          <CoolButton>Сотрудники</CoolButton>
        </StyledLink>
        <StyledLink to="/organization">
          <CoolButton>Организации</CoolButton>
        </StyledLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
