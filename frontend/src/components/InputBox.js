// src/components/InputBox.js

import React, { useState } from 'react';
import '../styles/InputBox.css';

function InputBox({ onSendMessage }) {
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini'); // Default model

  // Handle input change
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle model change
  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      onSendMessage(inputText, selectedModel);
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
      <select value={selectedModel} onChange={handleModelChange} className="model-selector">
        <option value="gpt-4o-mini">GPT-4o-Mini</option>
        <option value="gpt-4o">GPT-4o</option>
        {/* Add more models as needed */}
      </select>
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