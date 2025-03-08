import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthContext } from '../context/AuthContext';

// Initialize Stripe
const stripePromise = loadStripe('your_stripe_publishable_key');

const CheckoutContainer = styled.div`
  max-width: 800px;
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

const Title = styled.h1`
  margin: 0 0 2rem 0;
  color: #ffffff;
  font-size: 2rem;
  text-align: center;
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImagePreview = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

const ImageTitle = styled.h3`
  margin: 1rem 0;
  color: #ffffff;
  font-size: 1.2rem;
`;

const PaymentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PaymentOption = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  border: 2px solid ${props => props.selected ? '#ff6b6b' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.selected ? '#ff6b6b' : '#333'};
  }
`;

const PaymentOptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.selected ? '1rem' : '0'};
`;

const PaymentOptionTitle = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  
  i {
    margin-right: 0.5rem;
  }
`;

const PaymentForm = styled.div`
  margin-top: 1rem;
`;

const CardElementContainer = styled.div`
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #1a1a1a;
  margin-bottom: 1rem;
`;

const FormRow = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #f8f9fa;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #1a1a1a;
  color: #f8f9fa;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const OrderSummary = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #333;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #333;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const SummaryLabel = styled.span`
  color: #adb5bd;
`;

const SummaryValue = styled.span`
  color: #ffffff;
`;

const PayButton = styled.button`
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  width: 100%;
  margin-top: 2rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #ff8787;
  }
  
  &:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
  }
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

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #adb5bd;
`;

// Checkout Form Component
const CheckoutForm = ({ image, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'stripe') {
      if (!stripe || !elements) {
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        // Create payment intent
        const { data } = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
          imageId: image._id,
        });
        
        // Confirm card payment
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
          data.clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          }
        );
        
        if (stripeError) {
          setError(stripeError.message);
        } else if (paymentIntent.status === 'succeeded') {
          // Handle successful payment
          await axios.post('http://localhost:5000/api/payment/payment-success', {
            paymentIntentId: paymentIntent.id,
          });
          
          setSuccess(true);
          onSuccess();
          
          // Redirect to image detail after 2 seconds
          setTimeout(() => {
            navigate(`/image/${image._id}`);
          }, 2000);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Payment failed');
      } finally {
        setLoading(false);
      }
    } else if (paymentMethod === 'crypto') {
      setLoading(true);
      setError(null);
      
      try {
        // Process crypto payment (simulated)
        await axios.post('http://localhost:5000/api/payment/crypto-payment', {
          imageId: image._id,
          transactionHash: 'simulated_transaction_hash',
        });
        
        setSuccess(true);
        onSuccess();
        
        // Redirect to image detail after 2 seconds
        setTimeout(() => {
          navigate(`/image/${image._id}`);
        }, 2000);
      } catch (err) {
        setError(err.response?.data?.message || 'Payment failed');
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <PaymentSection>
        <PaymentOption 
          selected={paymentMethod === 'stripe'} 
          onClick={() => setPaymentMethod('stripe')}
        >
          <PaymentOptionHeader selected={paymentMethod === 'stripe'}>
            <PaymentOptionTitle>
              <i className="far fa-credit-card"></i>
              Credit Card
            </PaymentOptionTitle>
          </PaymentOptionHeader>
          
          {paymentMethod === 'stripe' && (
            <PaymentForm>
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
            </PaymentForm>
          )}
        </PaymentOption>
        
        <PaymentOption 
          selected={paymentMethod === 'crypto'} 
          onClick={() => setPaymentMethod('crypto')}
        >
          <PaymentOptionHeader selected={paymentMethod === 'crypto'}>
            <PaymentOptionTitle>
              <i className="fab fa-bitcoin"></i>
              Cryptocurrency
            </PaymentOptionTitle>
          </PaymentOptionHeader>
          
          {paymentMethod === 'crypto' && (
            <PaymentForm>
              <FormRow>
                <Label>Send payment to this address:</Label>
                <Input 
                  type="text" 
                  value="0x1234567890abcdef1234567890abcdef12345678" 
                  readOnly 
                />
              </FormRow>
              
              <FormRow>
                <Label>Transaction Hash:</Label>
                <Input 
                  type="text" 
                  value={cryptoAddress}
                  onChange={(e) => setCryptoAddress(e.target.value)}
                  placeholder="Enter transaction hash after payment"
                />
              </FormRow>
            </PaymentForm>
          )}
        </PaymentOption>
      </PaymentSection>
      
      <OrderSummary>
        <SummaryRow>
          <SummaryLabel>Price:</SummaryLabel>
          <SummaryValue>${image.price.toFixed(2)}</SummaryValue>
        </SummaryRow>
        
        <SummaryRow>
          <SummaryLabel>Tax:</SummaryLabel>
          <SummaryValue>$0.00</SummaryValue>
        </SummaryRow>
        
        <SummaryRow>
          <SummaryLabel>Total:</SummaryLabel>
          <SummaryValue>${image.price.toFixed(2)}</SummaryValue>
        </SummaryRow>
      </OrderSummary>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>Payment successful! Redirecting...</SuccessMessage>}
      
      <PayButton type="submit" disabled={loading || success}>
        {loading ? 'Processing...' : `Pay $${image.price.toFixed(2)}`}
      </PayButton>
    </form>
  );
};

// Main Checkout Component
const Checkout = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
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
  
  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
  };
  
  if (loading) {
    return <LoadingState>Loading checkout...</LoadingState>;
  }
  
  if (error) {
    return <LoadingState>Error: {error}</LoadingState>;
  }
  
  if (!image) {
    return <LoadingState>Image not found</LoadingState>;
  }
  
  return (
    <Elements stripe={stripePromise}>
      <CheckoutContainer>
        <BackLink to={`/image/${id}`}>
          <i className="fas fa-arrow-left" style={{ marginRight: '0.5rem' }}></i>
          Back to Image
        </BackLink>
        
        <Title>Checkout</Title>
        
        <CheckoutGrid>
          <ImagePreview>
            <img 
              src={`http://localhost:5000${image.url}`} 
              alt={image.title} 
            />
            <ImageTitle>{image.title}</ImageTitle>
          </ImagePreview>
          
          <CheckoutForm 
            image={image} 
            onSuccess={handlePaymentSuccess} 
          />
        </CheckoutGrid>
      </CheckoutContainer>
    </Elements>
  );
};

export default Checkout; 