import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #ffffff;
  font-size: 2.5rem;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  background-color: transparent;
  color: ${props => props.active ? '#ffffff' : '#adb5bd'};
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.active ? '#ffffff' : 'transparent'};
  }
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ImageCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageThumbnail = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ImageInfo = styled.div`
  padding: 1rem;
`;

const ImageTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #f8f9fa;
`;

const ImagePrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.free ? '#4cd964' : '#ff6b6b'};
`;

const ViewButton = styled(Link)`
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #ff8787;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #adb5bd;
`;

const LoginPrompt = styled.div`
  text-align: center;
  margin: 2rem;
  
  button {
    background-color: #ff6b6b;
    color: #fff;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
    
    &:hover {
      background-color: #ff8787;
    }
  }
`;

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('public');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, isPremium } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated()) {
      fetchImages(activeTab);
    }
  }, [activeTab, isAuthenticated]);
  
  const fetchImages = async (tab) => {
    try {
      setLoading(true);
      let endpoint = '/api/image/public';
      
      if (tab === 'premium') {
        endpoint = '/api/image/premium';
      } else if (tab === 'nsfw') {
        endpoint = '/api/image/nsfw';
      }
      
      const response = await axios.get(`http://localhost:5000${endpoint}`);
      setImages(response.data.images || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (!isAuthenticated()) {
    return (
      <LoginPrompt>
        <h2>Please login to view the gallery</h2>
        <button onClick={() => navigate('/login')}>Login</button>
      </LoginPrompt>
    );
  }
  
  return (
    <GalleryContainer>
      <Title>Photo Gallery</Title>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'public'} 
          onClick={() => setActiveTab('public')}
        >
          Public
        </Tab>
        <Tab 
          active={activeTab === 'premium'} 
          onClick={() => setActiveTab('premium')}
          disabled={!isPremium()}
        >
          Premium
        </Tab>
        <Tab 
          active={activeTab === 'nsfw'} 
          onClick={() => setActiveTab('nsfw')}
          disabled={!isPremium()}
        >
          NSFW
        </Tab>
      </TabContainer>
      
      {loading ? (
        <EmptyState>Loading images...</EmptyState>
      ) : images.length === 0 ? (
        <EmptyState>
          {activeTab === 'public' ? (
            <>
              No public images found. 
              <br />
              <Link to="/generate" style={{ color: '#ff6b6b', textDecoration: 'none' }}>
                Generate some images
              </Link>
            </>
          ) : (
            <>
              No {activeTab} images found.
              {!isPremium() && (
                <div style={{ marginTop: '1rem' }}>
                  <Link to="/profile" style={{ color: '#ff6b6b', textDecoration: 'none' }}>
                    Upgrade to premium
                  </Link>
                  {' '}to access {activeTab} content.
                </div>
              )}
            </>
          )}
        </EmptyState>
      ) : (
        <ImagesGrid>
          {images.map(image => (
            <ImageCard key={image._id}>
              <ImageThumbnail>
                <img 
                  src={`http://localhost:5000${image.url}`} 
                  alt={image.title} 
                />
              </ImageThumbnail>
              <ImageInfo>
                <ImageTitle>{image.title}</ImageTitle>
                <ImagePrice>
                  <Price free={image.price === 0}>
                    {image.price === 0 ? 'Free' : `$${image.price.toFixed(2)}`}
                  </Price>
                  <ViewButton to={`/image/${image._id}`}>
                    View
                  </ViewButton>
                </ImagePrice>
              </ImageInfo>
            </ImageCard>
          ))}
        </ImagesGrid>
      )}
    </GalleryContainer>
  );
};

export default Gallery; 