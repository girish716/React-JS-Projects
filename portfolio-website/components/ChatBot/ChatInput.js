import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';

const ChatInput = forwardRef(({ onSendMessage, isLoading, disabled }, ref) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  // Expose focus method to parent component
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="chat-input-wrapper">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Virtual Girish anything..."
            className="chat-input"
            disabled={isLoading || disabled}
            rows="1"
            style={{
              resize: 'none',
              overflow: 'hidden',
              minHeight: '40px',
              maxHeight: '120px'
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
            }}
          />
          <button
            type="submit"
            className="chat-send-btn"
            disabled={!message.trim() || isLoading || disabled}
          >
            {isLoading ? (
              <span className="loading-spinner">⟳</span>
            ) : (
              <span>➤</span>
            )}
          </button>
        </div>
      </form>
      <div className="chat-input-footer">
        <span>Virtual Girish is powered by AI • Be respectful</span>
      </div>
    </div>
  );
});

export default ChatInput;
