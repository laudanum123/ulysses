import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/CodeBlock.css';

function CodeBlock({ className, children }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const codeText = Array.isArray(children) ? children.join('') : children;
    navigator.clipboard.writeText(codeText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy!', err);
      });
  };

  return (
    <div className={`code-block ${className}`}>
      <pre>
        <code>{children}</code>
      </pre>
      <button
        className="copy-button"
        onClick={handleCopy}
        aria-label="Copy code to clipboard"
      >
        {copied ? '✅ Copied!' : '📋'}
      </button>
    </div>
  );
}

CodeBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CodeBlock;
