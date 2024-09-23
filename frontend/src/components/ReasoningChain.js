// src/components/ReasoningChain.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock'; // Ensure you have a CodeBlock component or adjust accordingly
import '../styles/ReasoningChain.css';

function ReasoningChain({ totalSteps, texts }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="reasoning-chain">
      <div
        className="summary"
        onClick={toggleExpansion}
        role="button"
        aria-expanded={isExpanded}
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleExpansion();
        }}
      >
        <span>{`Reasoning Steps: ${totalSteps}`}</span>
        <span className={`arrow ${isExpanded ? 'up' : 'down'}`}>
          {isExpanded ? '▲' : '▼'}
        </span>
      </div>
      {isExpanded && (
        <div className="details">
          {texts.map((text, index) => (
            <div key={index} className="step">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
                    if (!inline) {
                      return (
                        <CodeBlock className={className}>
                          {children}
                        </CodeBlock>
                      );
                    } else {
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                  },
                }}
              >
                {`**Step ${index + 1}:**\n\n${text}`}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ReasoningChain.propTypes = {
  totalSteps: PropTypes.number.isRequired,
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ReasoningChain;
