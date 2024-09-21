// src/components/InputBox.js

import React, { useState } from 'react';
import '../styles/InputBox.css';

function InputBox({ onSendMessage }) {
  const [inputText, setInputText] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form className="input-box" onSubmit={handleSubmit}>
      <textarea
        placeholder="Type your message..."
        value={inputText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={1}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default InputBox;
