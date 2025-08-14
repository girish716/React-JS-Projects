import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';

const ChatInput = forwardRef(({ onSendMessage, isLoading, disabled }, ref) => {
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      {/* Mobile full-width send button */}
      {isMobile && (
        <button
          type="button"
          className="mobile-send-btn-fullwidth"
          disabled={!message.trim() || isLoading || disabled}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (message.trim() && !isLoading && !disabled) {
              onSendMessage(message.trim());
              setMessage('');
              setTimeout(() => inputRef.current?.focus(), 100);
            }
          }}
        >
          {isLoading ? (
            <span className="loading-spinner">⟳</span>
          ) : (
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>SEND MESSAGE</span>
          )}
        </button>
      )}
      
      <div className="chat-input-footer">
        <span>Virtual Girish is powered by AI • Be respectful</span>
        {isMobile && (
          <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block', fontWeight: 'bold' }}>
            💡 Tap the SEND MESSAGE button above to send
          </span>
        )}
      </div>
    </div>
  );
});

export default ChatInput;
