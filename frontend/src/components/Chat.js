import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
  min-height: 500px;
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #2a2a2a;
  border-bottom: 1px solid #333;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.h3`
  margin: 0;
  color: #f8f9fa;
  font-size: 1rem;
`;

const OnlineStatus = styled.span`
  font-size: 0.8rem;
  color: #4cd964;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 0.8rem 1rem;
  border-radius: 18px;
  font-size: 0.9rem;
  line-height: 1.4;
  
  ${props => props.isUser ? `
    align-self: flex-end;
    background-color: #ff6b6b;
    color: #fff;
    border-bottom-right-radius: 4px;
  ` : `
    align-self: flex-start;
    background-color: #2a2a2a;
    color: #f8f9fa;
    border-bottom-left-radius: 4px;
  `}
`;

const MessageTime = styled.div`
  font-size: 0.7rem;
  margin-top: 0.3rem;
  color: ${props => props.isUser ? 'rgba(255, 255, 255, 0.7)' : '#adb5bd'};
  text-align: ${props => props.isUser ? 'right' : 'left'};
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #2a2a2a;
  border-top: 1px solid #333;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border-radius: 20px;
  border: 1px solid #333;
  background-color: #1a1a1a;
  color: #f8f9fa;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const SendButton = styled.button`
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #ff8787;
  }
  
  &:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
  }
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

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  // Fetch chat history on component mount
  useEffect(() => {
    if (isAuthenticated()) {
      fetchChatHistory();
    }
  }, [isAuthenticated]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);
  
  const fetchChatHistory = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:5000/api/chat/history');
      setChatHistory(res.data.chat.messages || []);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    try {
      setIsLoading(true);
      
      // Add user message to chat immediately for better UX
      const userMessage = {
        sender: 'user',
        content: message,
        timestamp: new Date(),
      };
      
      setChatHistory(prev => [...prev, userMessage]);
      setMessage('');
      
      // Send message to API
      const res = await axios.post('http://localhost:5000/api/chat/message', {
        message: message.trim(),
      });
      
      // Add Sienna's response to chat
      const siennaMessage = {
        sender: 'sienna',
        content: res.data.response,
        timestamp: new Date(),
      };
      
      setChatHistory(prev => [...prev, siennaMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  if (!isAuthenticated()) {
    return (
      <LoginPrompt>
        <h2>Please login to chat with Sienna</h2>
        <button onClick={() => navigate('/login')}>Login</button>
      </LoginPrompt>
    );
  }
  
  return (
    <ChatContainer>
      <ChatHeader>
        <ProfileImage src="/sienna-profile.jpg" alt="Sienna Carter" />
        <ProfileInfo>
          <ProfileName>Sienna Carter</ProfileName>
          <OnlineStatus>Online</OnlineStatus>
        </ProfileInfo>
      </ChatHeader>
      
      <ChatMessages>
        {chatHistory.length === 0 ? (
          <MessageBubble isUser={false}>
            Hi there! I'm Sienna. How can I help you today?
          </MessageBubble>
        ) : (
          chatHistory.map((msg, index) => (
            <div key={index}>
              <MessageBubble isUser={msg.sender === 'user'}>
                {msg.content}
              </MessageBubble>
              <MessageTime isUser={msg.sender === 'user'}>
                {formatTime(msg.timestamp)}
              </MessageTime>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </ChatMessages>
      
      <ChatInputContainer>
        <form onSubmit={handleSendMessage} style={{ display: 'flex', width: '100%' }}>
          <ChatInput
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
          />
          <SendButton type="submit" disabled={isLoading || !message.trim()}>
            <i className="fas fa-paper-plane"></i>
          </SendButton>
        </form>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default Chat; 