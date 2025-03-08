import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import ImageGenerator from './components/ImageGenerator';
import Gallery from './components/Gallery';
import ImageDetail from './components/ImageDetail';
import Checkout from './components/Checkout';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

// Context
import { AuthProvider } from './context/AuthContext';

// Styled components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212;
  color: #ffffff;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContainer>
          <Header />
          <MainContent>
            <Routes>
              <Route path="/" element={<Navigate to="/chat" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/generate" element={<ImageGenerator />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/image/:id" element={<ImageDetail />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </Router>
    </AuthProvider>
  );
}

export default App;
