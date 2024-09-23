// src/App.js

import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';
import { mockAssistantResponses } from './mockAssistantResponses'; // Import grouped mock data
import './styles/App.css';

function App() {
  const [messages, setMessages] = useState(() => {
    const savedMessages = sessionStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [responseQueue, setResponseQueue] = useState([]);
  const [responseIndex, setResponseIndex] = useState(0); // Tracks the next set of assistant responses

  useEffect(() => {
    sessionStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (responseQueue.length > 0) {
      const [firstResponse, ...rest] = responseQueue;
      // Simulate delay for each assistant message
      const timer = setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'assistant', text: firstResponse.text },
        ]);
        setResponseQueue(rest);
      }, 1000); // 1 second delay between messages

      return () => clearTimeout(timer);
    }
  }, [responseQueue, messages]);

  const handleSendMessage = (userMessage) => {
    const newMessages = [
      ...messages,
      { sender: 'user', text: userMessage },
    ];
    setMessages(newMessages);

    // Enqueue the next set of assistant responses based on responseIndex
    if (responseIndex < mockAssistantResponses.length) {
      const nextResponses = mockAssistantResponses[responseIndex];
      setResponseQueue((prevQueue) => [
        ...prevQueue,
        ...nextResponses,
      ]);
      setResponseIndex(responseIndex + 1);
    } else {
      // Optionally, handle cases where there are no more mock responses
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'assistant', text: 'No more mock responses available.' },
      ]);
    }
  };

  const clearChatOnServer = async () => {
    // Since we're using mock data, no server call is needed
    // This function can be left empty or removed
  };

  const handleClearChat = async () => {
    setMessages([]);
    sessionStorage.removeItem('messages');
    await clearChatOnServer();
    setResponseQueue([]);
    setResponseIndex(0); // Reset the response index
  };

  return (
    <div className="app-container">
      <ChatWindow messages={messages} onClearChat={handleClearChat} />
      <InputBox onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;
