// src/components/ChatWindow.js

import React, { useRef, useEffect } from 'react';
import Message from './Message';
import '../styles/ChatWindow.css';
import '../styles/Message.css';

function ChatWindow({ messages, onClearChat }) {
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <button className="clear-chat-button" onClick={onClearChat}>
          New Chat
        </button>
      </div>
      <div className="message-list">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatWindow;