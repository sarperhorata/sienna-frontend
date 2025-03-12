import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthContext } from '../context/AuthContext';

// Initialize Stripe
const stripePromise = loadStripe('your_stripe_publishable_key');

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  margin: 0 0 2rem 0;
  color: #ffffff;
  font-size: 2rem;
  text-align: center;
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

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  margin: 0 0 1rem 0;
  color: #ffffff;
  font-size: 1.5rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #f8f9fa;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
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

const Button = styled.button`
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #ff8787;
  }
  
  &:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
  }
`;

const SubscriptionCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: ${props => props.active ? '2px solid #4cd964' : '1px solid #333'};
`;

const SubscriptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SubscriptionTitle = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: 1.5rem;
`;

const SubscriptionPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6b6b;
`;

const SubscriptionFeatures = styled.ul`
  margin: 1.5rem 0;
  padding-left: 1.5rem;
  color: #f8f9fa;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const SubscriptionStatus = styled.div`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: ${props => props.active ? 'rgba(76, 217, 100, 0.2)' : 'rgba(255, 107, 107, 0.2)'};
  color: ${props => props.active ? '#4cd964' : '#ff6b6b'};
  margin-bottom: 1rem;
`;

const CardElementContainer = styled.div`
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #1a1a1a;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin-top: 1rem;
  padding: 0.8rem;
  background-color: rgba(255, 107, 107, 0.1);
  border-radius: 4px;
  border: 1px solid #ff6b6b;
`;

const SuccessMessage = styled.div`
  color: #4cd964;
  margin-top: 1rem;
  padding: 0.8rem;
  background-color: rgba(76, 217, 100, 0.1);
  border-radius: 4px;
  border: 1px solid #4cd964;
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

// Subscription Form Component
const SubscriptionForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const { user, isPremium } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Get payment method
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
      
      if (stripeError) {
        setError(stripeError.message);
        return;
      }
      
      // Subscribe to premium
      await axios.post('http://localhost:5000/api/payment/subscribe-premium', {
        paymentMethodId: paymentMethod.id,
      });
      
      setSuccess(true);
      
      // Reload page after 2 seconds to update subscription status
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Subscription failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubscribe}>
      <SubscriptionCard active={isPremium()}>
        <SubscriptionHeader>
          <SubscriptionTitle>Premium Membership</SubscriptionTitle>
          <SubscriptionPrice>$9.99/month</SubscriptionPrice>
        </SubscriptionHeader>
        
        <SubscriptionStatus active={isPremium()}>
          {isPremium() ? 'Active' : 'Inactive'}
        </SubscriptionStatus>
        
        <SubscriptionFeatures>
          <li>Access to all premium content</li>
          <li>Unlimited image generation</li>
          <li>NSFW content access</li>
          <li>Priority support</li>
          <li>Early access to new features</li>
        </SubscriptionFeatures>
        
        {!isPremium() && (
          <>
            <CardElementContainer>
              <CardElement 
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#f8f9fa',
                      '::placeholder': {
                        color: '#adb5bd',
                      },
                    },
                    invalid: {
                      color: '#ff6b6b',
                    },
                  },
                }}
              />
            </CardElementContainer>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>Subscription successful! Reloading...</SuccessMessage>}
            
            <Button type="submit" disabled={loading || success}>
              {loading ? 'Processing...' : 'Subscribe Now'}
            </Button>
          </>
        )}
      </SubscriptionCard>
    </form>
  );
};

// Account Settings Component
const AccountSettings = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Update user profile (this endpoint would need to be implemented)
      await axios.put('http://localhost:5000/api/auth/update-profile', {
        username: formData.username,
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      
      setSuccess(true);
      
      // Clear password fields
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Section>
        <SectionTitle>Account Information</SectionTitle>
        
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
      </Section>
      
      <Section>
        <SectionTitle>Change Password</SectionTitle>
        
        <FormGroup>
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </FormGroup>
      </Section>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>Profile updated successfully!</SuccessMessage>}
      
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
};

// Main Profile Component
const Profile = () => {
  const [activeTab, setActiveTab] = useState('account');
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  if (!isAuthenticated()) {
    return (
      <LoginPrompt>
        <h2>Please login to view your profile</h2>
        <button onClick={() => navigate('/login')}>Login</button>
      </LoginPrompt>
    );
  }
  
  return (
    <ProfileContainer>
      <Title>My Profile</Title>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'account'} 
          onClick={() => setActiveTab('account')}
        >
          Account Settings
        </Tab>
        <Tab 
          active={activeTab === 'subscription'} 
          onClick={() => setActiveTab('subscription')}
        >
          Subscription
        </Tab>
      </TabContainer>
      
      {activeTab === 'account' ? (
        <AccountSettings />
      ) : (
        <Elements stripe={stripePromise}>
          <SubscriptionForm />
        </Elements>
      )}
    </ProfileContainer>
  );
};

export default Profile; 