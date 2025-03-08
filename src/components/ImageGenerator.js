import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const GeneratorContainer = styled.div`
  max-width: 1000px;
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

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SelectLabel = styled.label`
  font-size: 1rem;
  color: #f8f9fa;
`;

const Select = styled.select`
  padding: 0.8rem;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #2a2a2a;
  color: #f8f9fa;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #2a2a2a;
  color: #f8f9fa;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background-color: ${props => props.secondary ? '#4a4a4a' : '#ff6b6b'};
  color: #fff;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.secondary ? '#5a5a5a' : '#ff8787'};
  }
  
  &:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
  }
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const ImagePreview = styled.div`
  width: 100%;
  max-width: 512px;
  height: 512px;
  background-color: #2a2a2a;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  overflow: hidden;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const PlaceholderText = styled.div`
  text-align: center;
  color: #adb5bd;
  font-size: 1rem;
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

const ImageGenerator = () => {
  const [activeTab, setActiveTab] = useState('simple');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [formData, setFormData] = useState({
    background: '',
    action: '',
    emotion: '',
    cameraShot: '',
    cameraAngle: '',
    bodyShape: '',
    breastSize: '',
    clothing: '',
    clothingColor: '',
    nsfw: 'none',
    customPrompt: '',
  });
  
  const { isAuthenticated, isPremium } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      
      const requestData = {
        ...formData,
        isAdvanced: activeTab === 'advanced',
      };
      
      const response = await axios.post('http://localhost:5000/api/image/generate', requestData);
      
      setGeneratedImage(response.data.image);
    } catch (error) {
      console.error('Error generating image:', error);
      alert(error.response?.data?.message || 'Error generating image');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleFeelingLucky = async () => {
    // Randomly select options
    const backgrounds = ['beach', 'city', 'forest', 'mountains', 'studio'];
    const actions = ['standing', 'sitting', 'walking', 'running', 'posing'];
    const emotions = ['happy', 'serious', 'thoughtful', 'excited', 'relaxed'];
    const cameraShots = ['close-up', 'medium shot', 'full body', 'portrait'];
    const cameraAngles = ['eye level', 'high angle', 'low angle', 'dutch angle'];
    const bodyShapes = ['athletic', 'slim', 'curvy', 'petite'];
    const breastSizes = ['small', 'medium', 'large'];
    const clothing = ['casual', 'formal', 'sportswear', 'swimwear', 'business attire'];
    const clothingColors = ['red', 'blue', 'black', 'white', 'green', 'yellow', 'purple'];
    
    const randomFormData = {
      background: backgrounds[Math.floor(Math.random() * backgrounds.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      emotion: emotions[Math.floor(Math.random() * emotions.length)],
      cameraShot: cameraShots[Math.floor(Math.random() * cameraShots.length)],
      cameraAngle: cameraAngles[Math.floor(Math.random() * cameraAngles.length)],
      bodyShape: bodyShapes[Math.floor(Math.random() * bodyShapes.length)],
      breastSize: breastSizes[Math.floor(Math.random() * breastSizes.length)],
      clothing: clothing[Math.floor(Math.random() * clothing.length)],
      clothingColor: clothingColors[Math.floor(Math.random() * clothingColors.length)],
      nsfw: 'none',
      customPrompt: '',
    };
    
    setFormData(randomFormData);
    
    // Generate with random options
    try {
      setIsGenerating(true);
      
      const requestData = {
        ...randomFormData,
        isAdvanced: false,
      };
      
      const response = await axios.post('http://localhost:5000/api/image/generate', requestData);
      
      setGeneratedImage(response.data.image);
    } catch (error) {
      console.error('Error generating image:', error);
      alert(error.response?.data?.message || 'Error generating image');
    } finally {
      setIsGenerating(false);
    }
  };
  
  if (!isAuthenticated()) {
    return (
      <LoginPrompt>
        <h2>Please login to generate images</h2>
        <button onClick={() => navigate('/login')}>Login</button>
      </LoginPrompt>
    );
  }
  
  return (
    <GeneratorContainer>
      <Title>Generate photo</Title>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'simple'} 
          onClick={() => setActiveTab('simple')}
        >
          Simple
        </Tab>
        <Tab 
          active={activeTab === 'advanced'} 
          onClick={() => setActiveTab('advanced')}
        >
          Advanced
        </Tab>
      </TabContainer>
      
      {activeTab === 'simple' ? (
        <OptionsContainer>
          <SelectGroup>
            <SelectLabel>Background</SelectLabel>
            <Select 
              name="background" 
              value={formData.background}
              onChange={handleChange}
            >
              <option value="">Select background</option>
              <option value="beach">Beach</option>
              <option value="city">City</option>
              <option value="forest">Forest</option>
              <option value="mountains">Mountains</option>
              <option value="studio">Studio</option>
            </Select>
          </SelectGroup>
          
          <SelectGroup>
            <SelectLabel>Action</SelectLabel>
            <Select 
              name="action" 
              value={formData.action}
              onChange={handleChange}
            >
              <option value="">Select action</option>
              <option value="standing">Standing</option>
              <option value="sitting">Sitting</option>
              <option value="walking">Walking</option>
              <option value="running">Running</option>
              <option value="posing">Posing</option>
            </Select>
          </SelectGroup>
          
          <SelectGroup>
            <SelectLabel>Emotion</SelectLabel>
            <Select 
              name="emotion" 
              value={formData.emotion}
              onChange={handleChange}
            >
              <option value="">Select emotion</option>
              <option value="happy">Happy</option>
              <option value="serious">Serious</option>
              <option value="thoughtful">Thoughtful</option>
              <option value="excited">Excited</option>
              <option value="relaxed">Relaxed</option>
            </Select>
          </SelectGroup>
          
          <SelectGroup>
            <SelectLabel>Camera shot</SelectLabel>
            <Select 
              name="cameraShot" 
              value={formData.cameraShot}
              onChange={handleChange}
            >
              <option value="">Select camera shot</option>
              <option value="close-up">Close-up</option>
              <option value="medium shot">Medium shot</option>
              <option value="full body">Full body</option>
              <option value="portrait">Portrait</option>
            </Select>
          </SelectGroup>
          
          <SelectGroup>
            <SelectLabel>Camera angle</SelectLabel>
            <Select 
              name="cameraAngle" 
              value={formData.cameraAngle}
              onChange={handleChange}
            >
              <option value="">Select camera angle</option>
              <option value="eye level">Eye level</option>
              <option value="high angle">High angle</option>
              <option value="low angle">Low angle</option>
              <option value="dutch angle">Dutch angle</option>
            </Select>
          </SelectGroup>
          
          <SelectGroup>
            <SelectLabel>Body shape</SelectLabel>
            <Select 
              name="bodyShape" 
              value={formData.bodyShape}
              onChange={handleChange}
            >
              <option value="">Select body shape</option>
              <option value="athletic">Athletic</option>
              <option value="slim">Slim</option>
              <option value="curvy">Curvy</option>
              <option value="petite">Petite</option>
            </Select>
          </SelectGroup>
          
          <SelectGroup>
            <SelectLabel>Breast size</SelectLabel>
            <Select 
              name="breastSize" 
              value={formData.breastSize}
              onChange={handleChange}
            >
              <option value="">Select breast size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </Select>
          </SelectGroup>
          
          <SelectGroup>
            <SelectLabel>Clothing</SelectLabel>
            <Select 
              name="clothing" 
              value={formData.clothing}
              onChange={handleChange}
            >
              <option value="">Select clothing</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="sportswear">Sportswear</option>
              <option value="swimwear">Swimwear</option>
              <option value="business attire">Business attire</option>
            </Select>
          </SelectGroup>
          
          <SelectGroup>
            <SelectLabel>Clothing color</SelectLabel>
            <Select 
              name="clothingColor" 
              value={formData.clothingColor}
              onChange={handleChange}
            >
              <option value="">Select color</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="purple">Purple</option>
            </Select>
          </SelectGroup>
          
          <SelectGroup>
            <SelectLabel>NSFW</SelectLabel>
            <Select 
              name="nsfw" 
              value={formData.nsfw}
              onChange={handleChange}
              disabled={!isPremium()}
            >
              <option value="none">None</option>
              {isPremium() && (
                <>
                  <option value="suggestive">Suggestive</option>
                  <option value="lingerie">Lingerie</option>
                  <option value="topless">Topless</option>
                  <option value="nude">Nude</option>
                </>
              )}
            </Select>
            {!isPremium() && (
              <small style={{ color: '#ff6b6b', marginTop: '0.3rem' }}>
                Premium subscription required for NSFW content
              </small>
            )}
          </SelectGroup>
        </OptionsContainer>
      ) : (
        <SelectGroup>
          <SelectLabel>Custom Prompt</SelectLabel>
          <TextArea
            name="customPrompt"
            value={formData.customPrompt}
            onChange={handleChange}
            placeholder="Describe the image you want to generate in detail..."
          />
        </SelectGroup>
      )}
      
      <ButtonContainer>
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate'}
        </Button>
        
        <Button 
          secondary
          onClick={handleFeelingLucky}
          disabled={isGenerating}
        >
          Feeling Lucky
        </Button>
      </ButtonContainer>
      
      <ResultContainer>
        <ImagePreview>
          {generatedImage ? (
            <img 
              src={`http://localhost:5000${generatedImage.url}`} 
              alt="Generated" 
            />
          ) : (
            <PlaceholderText>
              Select options and generate photos
              <br /><br />
              Your generated photos will appear here
            </PlaceholderText>
          )}
        </ImagePreview>
      </ResultContainer>
    </GeneratorContainer>
  );
};

export default ImageGenerator; 