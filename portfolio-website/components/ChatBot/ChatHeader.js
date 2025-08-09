import React from 'react';
import { BsX, BsFillChatDotsFill } from 'react-icons/bs';

const ChatHeader = ({ onClose, isMinimized, onToggleMinimize }) => {
  return (
    <div className="chat-header">
      <div className="chat-header-info">
        <div className="chat-avatar">
          <BsFillChatDotsFill />
        </div>
        <div className="chat-title">
          <h3>Virtual Girish</h3>
          <span className="chat-status">Online • Ask me anything!</span>
        </div>
      </div>
      <div className="chat-header-actions">
        <button 
          className="chat-minimize-btn"
          onClick={onToggleMinimize}
          title={isMinimized ? "Expand chat" : "Minimize chat"}
        >
          {isMinimized ? '□' : '−'}
        </button>
        <button 
          className="chat-close-btn"
          onClick={onClose}
          title="Close chat"
        >
          <BsX />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
