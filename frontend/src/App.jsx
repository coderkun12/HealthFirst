// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatBox from './components/ChatBox';
import MessageInput from './components/MessageInput';
import Login from './components/Login'; // You'll need to create this component
import Signup from './components/Signup'; // You'll need to create this component
import { fetchMessages, sendMessage, createSession, checkAuth, logout } from './services/api';
import './styles.css';

// Main dashboard component (your current App functionality)
function Dashboard() {
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Create a new session if none exists
    const initializeApp = async () => {
      if (!activeSessionId) {
        const newSession = await createSession();
        if (newSession) {
          setActiveSessionId(newSession.session_id);
        }
      }
    };
    
    initializeApp();
  }, []);

  useEffect(() => {
    if (activeSessionId) {
      loadMessages(activeSessionId);
    }
  }, [activeSessionId]);

  const loadMessages = async (sessionId) => {
    setLoading(true);
    const messagesData = await fetchMessages(sessionId);
    setMessages(messagesData);
    setLoading(false);
  };

  const handleSelectSession = (sessionId) => {
    setActiveSessionId(sessionId);
  };

  const handleSendMessage = async (messageText) => {
    // Optimistically add user message to UI
    const userMessage = {
      sender: 'user',
      content: messageText,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, userMessage]);
    setLoading(true);
    
    // Send to backend
    const response = await sendMessage(activeSessionId, messageText);
    
    if (response) {
      // Add bot response to UI
      const botMessage = {
        sender: 'bot',
        content: response.bot_response,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };


  console.log(loading);
  console.log(activeSessionId)

  
  return (
    <div className="app">
      <Sidebar 
        onSelectSession={handleSelectSession} 
        activeSessionId={activeSessionId} 
      />
      <div className="main-content">
        <Header onLogout={handleLogout} />
        <div className="chat-container">
          <ChatBox messages={messages} />
          <MessageInput 
            onSendMessage={handleSendMessage} 
            disabled={loading || !activeSessionId} 
          />
        </div>
      </div>
    </div>
  );
}

// Main App component with routing
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated when app loads
    const verifyAuth = async () => {
      try {
        const result = await checkAuth();
        setAuthenticated(result.authenticated);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={authenticated ? <Navigate to="/dashboard" /> : <Login setAuthenticated={setAuthenticated} />} />
        <Route path="/signup" element={authenticated ? <Navigate to="/dashboard" /> : <Signup setAuthenticated={setAuthenticated} />} />
        <Route path="/dashboard" element={authenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={authenticated ? "/dashboard" : "/login"} />} />
        <Route path="*" element={<Navigate to={authenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;