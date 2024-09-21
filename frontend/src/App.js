// src/App.js

import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';
import './styles/App.css';

function App() {
  const [messages, setMessages] = useState(() => {
    const savedMessages = sessionStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });


  useEffect(() => {
    sessionStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async (userMessage) => {
    const newMessages = [
      ...messages,
      { sender: 'user', text: userMessage },
    ];
    setMessages(newMessages);
  
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
  
      const reader = response.body.getReader();
      let assistantMessage = '';
      const decoder = new TextDecoder('utf-8');
  
      // Add the assistant placeholder message
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'assistant', text: '' },
      ]);
  
      const readChunk = async () => {
        const { done, value } = await reader.read();
        if (done) {
          return;
        }
  
        // Update assistant message as chunks are received
        assistantMessage += decoder.decode(value);
  
        // Use the functional form to update state to ensure it's not stale
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1), // Remove last assistant message
          { sender: 'assistant', text: assistantMessage }, // Add updated assistant message
        ]);
  
        readChunk(); // Continue reading
      };
  
      readChunk();
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: 'assistant',
          text: 'Sorry, there was an error processing your request.',
        },
      ]);
    }
  };
  

  const clearChatOnServer = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to clear chat on server');
      }
    } catch (error) {
      console.error('Error clearing chat on server:', error);
    }
  };

  const handleClearChat = async () => {
    setMessages([]);
    sessionStorage.removeItem('messages');
    await clearChatOnServer();
  };


  return (
    <div className="app-container">
      <ChatWindow messages={messages} onClearChat={handleClearChat} />
      <InputBox onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;
