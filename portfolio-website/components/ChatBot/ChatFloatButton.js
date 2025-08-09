import React, { useState, useEffect } from 'react';
import { BsFillChatDotsFill } from 'react-icons/bs';

const ChatFloatButton = ({ onClick, isOpen }) => {
  const [shouldHighlight, setShouldHighlight] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // Show tooltip immediately when page loads
    setShowTooltip(true);
    
    // Start highlighting after 1 second
    const highlightTimer = setTimeout(() => {
      setShouldHighlight(true);
      // Remove highlight after animation
      setTimeout(() => setShouldHighlight(false), 2000);
    }, 1000);

    // Hide tooltip after 5 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => {
      clearTimeout(highlightTimer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  return (
    <div className={`chat-float-container ${isOpen ? 'hidden' : ''}`}>
      <button
        className={`chat-float-btn ${shouldHighlight ? 'highlight' : ''}`}
        onClick={onClick}
        title="💬 Chat with Virtual Girish - Ask me anything!"
      >
        <BsFillChatDotsFill />
        <span className="chat-btn-text">Ask Girish</span>
      </button>
      {showTooltip && (
        <div className="chat-tooltip">
          👋 Hi! I'm Virtual Girish. Click to chat!
        </div>
      )}
    </div>
  );
};

export default ChatFloatButton;
