import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const chatInputRef = useRef(null);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 1,
        message: "🚀 Hey there! Welcome to my AI-powered portfolio! I'm Virtual Girish, and I'm super excited to chat with you! 💫 I can share amazing insights about my journey as a Software Engineer at Cisco Systems, my cutting-edge projects, technical expertise, and much more! What would you love to discover about my work? ✨",
        isUser: false,
        timestamp: new Date().toISOString()
      }]);
    }
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      message: messageText,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.message
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: conversationHistory
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const botMessage = {
        id: Date.now() + 1,
        message: data.response,
        isUser: false,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);

      // Focus input after bot responds
      setTimeout(() => {
        chatInputRef.current?.focus();
      }, 100);

    } catch (error) {
      console.error('Chat error:', error);
      
      let errorMessage = "Sorry, I'm having trouble responding right now. Please try again later.";
      
      if (error.message.includes('rate limit') || error.message.includes('quota')) {
        errorMessage = "I'm getting a lot of questions right now! Please try again in a moment.";
      } else if (error.message.includes('Invalid request') || error.message.includes('professional background')) {
        errorMessage = "🛡️ Hey there! I'm Virtual Girish, and I'm here to chat about my professional journey as a Software Engineer at Cisco Systems! I'd love to tell you about my technical skills, projects, experience, or how to get in touch. What would you like to know about my work? 😊";
      }

      const errorBotMessage = {
        id: Date.now() + 1,
        message: errorMessage,
        isUser: false,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, errorBotMessage]);
      setError(null); // Clear error state for security messages

      // Focus input after error response too
      setTimeout(() => {
        chatInputRef.current?.focus();
      }, 100);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    onClose();
    // Reset state when closing
    setTimeout(() => {
      setMessages([]);
      setIsMinimized(false);
      setError(null);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className={`chatbot-overlay ${isOpen ? 'open' : ''} ${isMinimized ? 'minimized' : ''}`}>
      <div className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}>
        <ChatHeader 
          onClose={handleClose}
          isMinimized={isMinimized}
          onToggleMinimize={handleToggleMinimize}
        />
        
        {!isMinimized && (
          <>
            <div className="chat-messages" ref={chatContainerRef}>
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg.message}
                  isUser={msg.isUser}
                  timestamp={msg.timestamp}
                />
              ))}
              {isLoading && (
                <div className="typing-indicator">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="typing-text">Virtual Girish is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <ChatInput
              ref={chatInputRef}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              disabled={!!error}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
