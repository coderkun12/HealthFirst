// src/components/ChatMessage.jsx
import React from 'react';

const ChatMessage = ({ message }) => { // An object containing the message details.
  const isUser = message.sender === 'user'; // Checks if the message is from user or bot. 
  // If the sender is user, the isUser==True. Otherwise false.
  const messageText=message.content || message.messages; // Extract the message text.
  
  return (
    <div className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className="message-bubble">
        {messageText}
      </div>
      <div className="message-info">
        <span className="sender">{isUser ? 'You' : 'Bot'}</span>
        <span className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default ChatMessage;