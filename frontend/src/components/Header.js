import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

const HeaderContainer = styled.header`
  background-color: #1a1a1a;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: #ff6b6b;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #ff8787;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: #f8f9fa;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 0;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #ff6b6b;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  &.active:after {
    width: 100%;
  }
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#ff6b6b' : 'transparent'};
  color: ${props => props.primary ? '#fff' : '#ff6b6b'};
  border: ${props => props.primary ? 'none' : '1px solid #ff6b6b'};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#ff8787' : 'rgba(255, 107, 107, 0.1)'};
  }
`;

const Header = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <HeaderContainer>
      <Logo to="/">Sienna Carter</Logo>
      
      <Nav>
        {isAuthenticated() ? (
          <>
            <NavLink to="/chat">Chat</NavLink>
            <NavLink to="/generate">Generate</NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <Button primary onClick={() => navigate('/register')}>Sign Up</Button>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 