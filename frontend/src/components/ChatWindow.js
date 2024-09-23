// src/components/ChatWindow.js

import React, { useRef, useEffect } from 'react';
import Message from './Message';
import ReasoningChain from './ReasoningChain';
import PropTypes from 'prop-types';
import '../styles/ChatWindow.css';
import '../styles/Message.css';
import '../styles/ReasoningChain.css';

function ChatWindow({ messages, onClearChat, isLoading }) {
  const messagesEndRef = useRef(null);

  /**
   * Checks if the message text contains code blocks.
   * @param {string} text - The message text.
   * @returns {boolean} - True if code blocks are present, else false.
   */
  const containsCode = (text) => {
    const codeBlockRegex = /```[\s\S]*?```|`[^`]*`/;
    return codeBlockRegex.test(text);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * Groups messages into conversations based on user prompts.
   * Each conversation starts with a user message followed by assistant messages.
   * Assistant messages with code blocks are grouped into a single ReasoningChain.
   * The last assistant message without code blocks is treated as the final answer.
   * @param {Array} messages - The array of chat messages.
   * @returns {Array} - An array of conversation groups.
   */
  const groupMessages = (messages) => {
    const grouped = [];
    let i = 0;

    while (i < messages.length) {
      const message = messages[i];

      if (message.sender === 'user') {
        const conversation = {
          user: message,
          assistant: [],
        };
        i += 1;

        while (i < messages.length && messages[i].sender === 'assistant') {
          conversation.assistant.push(messages[i]);
          i += 1;
        }

        grouped.push(conversation);
      } else if (message.sender === 'assistant') {
        grouped.push({
          user: null,
          assistant: [message],
        });
        i += 1;
      } else {
        i += 1;
      }
    }

    return grouped;
  };

  const groupedConversations = groupMessages(messages);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <button className="clear-chat-button" onClick={onClearChat}>
          New Chat
        </button>
      </div>
      <div className="message-list">
        {groupedConversations.map((conversation, convoIndex) => (
          <div key={convoIndex} className="conversation">
            {conversation.user && (
              <Message
                sender={conversation.user.sender}
                text={conversation.user.text}
              />
            )}
            {renderAssistantMessages(conversation.assistant, convoIndex)}
          </div>
        ))}
        {isLoading && (
          <div className="loading-indicator">
            Assistant is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

/**
 * Renders assistant messages, grouping reasoning steps and final answers.
 * @param {Array} assistantMessages - The array of assistant messages.
 * @param {number} convoIndex - The index of the conversation group.
 * @returns {Array} - An array of React elements (ReasoningChain and Message).
 */
const renderAssistantMessages = (assistantMessages, convoIndex) => {
  const renderedElements = [];
  let i = 0;

  while (i < assistantMessages.length) {
    const assistantMsg = assistantMessages[i];
    const isCode = containsCode(assistantMsg.text);
    const isFinalAnswer =
      !isCode && i === assistantMessages.length - 1;

    if (isCode) {
      // Collect all consecutive assistant messages with code as reasoning steps
      const reasoningMessages = [];
      let j = i;
      while (
        j < assistantMessages.length &&
        containsCode(assistantMessages[j].text)
      ) {
        reasoningMessages.push(assistantMessages[j].text);
        j += 1;
      }

      // Render ReasoningChain with the array of reasoning message texts
      renderedElements.push(
        <ReasoningChain
          key={`${convoIndex}-reasoning-${i}`}
          totalSteps={reasoningMessages.length}
          texts={reasoningMessages} // Pass an array of texts
        />
      );

      // Move the index forward to skip processed reasoning messages
      i = j;
    }

    // After processing reasoning steps, check for a final answer
    if (isFinalAnswer) {
      renderedElements.push(
        <Message
          key={`${convoIndex}-final-${i}`}
          sender={assistantMsg.sender}
          text={assistantMsg.text}
        />
      );
      i += 1;
    }
  }

  return renderedElements;
};

/**
 * Helper function to check if a text contains code blocks.
 * @param {string} text - The text to check.
 * @returns {boolean} - True if code blocks are present, else false.
 */
const containsCode = (text) => {
  const codeBlockRegex = /```[\s\S]*?```|`[^`]*`/;
  return codeBlockRegex.test(text);
};

ChatWindow.propTypes = {
  messages: PropTypes.array.isRequired,
  onClearChat: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ChatWindow;
