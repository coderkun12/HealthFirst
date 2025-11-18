import React, { useEffect, useRef } from 'react'; // useEffect allows use of auto-scroll. useRef creates a reference to DOM element used for scrolling.
import ChatMessage from './ChatMessage'; // Responsible for individual chat messages.

const ChatBox = ({ messages }) => {
  const messagesEndRef = useRef(null); // creates a reference to an element inside chat-box. Enables auto scrolling to the bottom when new message occurs.

// Allows smooth scrolling. 
// scrollIntoView()  makes sure scrolling is smooth.
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // runs after every render where messages changes. Makes sure messages are visible at bottom.
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-box-container">
      <div className="chat-box">
        {messages.length === 0 ? (
          <div className="empty-chat">
            {/*If messages is empty, display message: "Start conversation..."
            If messages has data, it maps it over message array. 
             -Each message is rendered using ChatMessage component.
             -key={index} provides unique key for react rendering.
            */}
            <p>Start a conversation with the German ChatBot!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatBox;