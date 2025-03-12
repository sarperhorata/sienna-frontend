import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const DetailContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #adb5bd;
  text-decoration: none;
  margin-bottom: 2rem;
  
  &:hover {
    color: #ff6b6b;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

const ImageInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 0 0 1rem 0;
  color: #ffffff;
  font-size: 2rem;
`;

const Description = styled.p`
  color: #adb5bd;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const MetadataSection = styled.div`
  margin-bottom: 2rem;
`;

const MetadataTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #ffffff;
  font-size: 1.2rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
`;

const MetadataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetadataLabel = styled.span`
  color: #adb5bd;
  font-size: 0.9rem;
`;

const MetadataValue = styled.span`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
`;

const PriceSection = styled.div`
  margin-top: auto;
  padding-top: 2rem;
  border-top: 1px solid #333;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.free ? '#4cd964' : '#ff6b6b'};
  margin-bottom: 1rem;
`;

const PurchaseButton = styled.button`
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  width: 100%;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #ff8787;
  }
  
  &:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
  }
`;

const PremiumPrompt = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: rgba(255, 107, 107, 0.1);
  border-radius: 4px;
  border: 1px solid #ff6b6b;
  
  a {
    color: #ff6b6b;
    text-decoration: none;
    font-weight: bold;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #adb5bd;
`;

const ImageDetail = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, isPremium, user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated()) {
      fetchImage();
    } else {
      navigate('/login');
    }
  }, [id, isAuthenticated]);
  
  const fetchImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/image/${id}`);
      setImage(response.data.image);
    } catch (error) {
      console.error('Error fetching image:', error);
      setError(error.response?.data?.message || 'Error fetching image');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePurchase = () => {
    navigate(`/checkout/${id}`);
  };
  
  // Check if user has already purchased this image
  const hasUserPurchased = () => {
    return user?.purchasedImages?.includes(id);
  };
  
  if (loading) {
    return <LoadingState>Loading image...</LoadingState>;
  }
  
  if (error) {
    return <LoadingState>Error: {error}</LoadingState>;
  }
  
  if (!image) {
    return <LoadingState>Image not found</LoadingState>;
  }
  
  return (
    <DetailContainer>
      <BackLink to="/gallery">
        <i className="fas fa-arrow-left" style={{ marginRight: '0.5rem' }}></i>
        Back to Gallery
      </BackLink>
      
      <ImageContainer>
        <ImageWrapper>
          <img 
            src={`http://localhost:5000${image.url}`} 
            alt={image.title} 
          />
        </ImageWrapper>
        
        <ImageInfo>
          <Title>{image.title}</Title>
          <Description>{image.description}</Description>
          
          <MetadataSection>
            <MetadataTitle>Image Details</MetadataTitle>
            <MetadataGrid>
              {image.metadata.background && (
                <MetadataItem>
                  <MetadataLabel>Background</MetadataLabel>
                  <MetadataValue>{image.metadata.background}</MetadataValue>
                </MetadataItem>
              )}
              
              {image.metadata.action && (
                <MetadataItem>
                  <MetadataLabel>Action</MetadataLabel>
                  <MetadataValue>{image.metadata.action}</MetadataValue>
                </MetadataItem>
              )}
              
              {image.metadata.emotion && (
                <MetadataItem>
                  <MetadataLabel>Emotion</MetadataLabel>
                  <MetadataValue>{image.metadata.emotion}</MetadataValue>
                </MetadataItem>
              )}
              
              {image.metadata.cameraShot && (
                <MetadataItem>
                  <MetadataLabel>Camera Shot</MetadataLabel>
                  <MetadataValue>{image.metadata.cameraShot}</MetadataValue>
                </MetadataItem>
              )}
              
              {image.metadata.cameraAngle && (
                <MetadataItem>
                  <MetadataLabel>Camera Angle</MetadataLabel>
                  <MetadataValue>{image.metadata.cameraAngle}</MetadataValue>
                </MetadataItem>
              )}
              
              {image.metadata.clothing && (
                <MetadataItem>
                  <MetadataLabel>Clothing</MetadataLabel>
                  <MetadataValue>{image.metadata.clothing}</MetadataValue>
                </MetadataItem>
              )}
            </MetadataGrid>
          </MetadataSection>
          
          <PriceSection>
            <Price free={image.price === 0}>
              {image.price === 0 ? 'Free' : `$${image.price.toFixed(2)}`}
            </Price>
            
            {image.price > 0 && !hasUserPurchased() && !isPremium() && (
              <PremiumPrompt>
                <p>
                  Premium members get access to all content. 
                  <br />
                  <Link to="/profile">Upgrade to premium</Link>
                </p>
              </PremiumPrompt>
            )}
            
            {image.price > 0 && !hasUserPurchased() && !isPremium() ? (
              <PurchaseButton onClick={handlePurchase}>
                Purchase Image
              </PurchaseButton>
            ) : image.price > 0 && !hasUserPurchased() && isPremium() ? (
              <PurchaseButton onClick={handlePurchase}>
                Download (Premium Member)
              </PurchaseButton>
            ) : image.price > 0 && hasUserPurchased() ? (
              <PurchaseButton disabled>
                Already Purchased
              </PurchaseButton>
            ) : (
              <PurchaseButton disabled>
                Free Image
              </PurchaseButton>
            )}
          </PriceSection>
        </ImageInfo>
      </ImageContainer>
    </DetailContainer>
  );
};

export default ImageDetail; 