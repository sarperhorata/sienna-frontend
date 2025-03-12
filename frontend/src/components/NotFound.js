import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 6rem;
  margin: 0;
  color: #ff6b6b;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin: 1rem 0 2rem;
  color: #ffffff;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #adb5bd;
  max-width: 600px;
`;

const HomeButton = styled(Link)`
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #ff8787;
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Description>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </Description>
      <HomeButton to="/">Go Home</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound; 