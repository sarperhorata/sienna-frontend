import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  padding: 2rem;
  color: #f8f9fa;
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  margin-right: 2rem;
  
  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #ff6b6b;
`;

const FooterLink = styled(Link)`
  display: block;
  color: #f8f9fa;
  text-decoration: none;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: #ff6b6b;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: #f8f9fa;
  font-size: 1.5rem;
  
  &:hover {
    color: #ff6b6b;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #333;
  font-size: 0.9rem;
  color: #adb5bd;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Sienna Carter</FooterTitle>
          <p>Connect with Sienna, an AI influencer with a passion for fashion, fitness, and authenticity.</p>
          <SocialLinks>
            <SocialIcon href="https://twitter.com/sien_carter" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </SocialIcon>
            <SocialIcon href="https://instagram.com/sien_carter" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialIcon>
            <SocialIcon href="https://tiktok.com/@sien_carter" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-tiktok"></i>
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/chat">Chat with Sienna</FooterLink>
          <FooterLink to="/generate">Generate Photos</FooterLink>
          <FooterLink to="/gallery">Photo Gallery</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Legal</FooterTitle>
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/cookies">Cookie Policy</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {new Date().getFullYear()} Sienna Carter. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 