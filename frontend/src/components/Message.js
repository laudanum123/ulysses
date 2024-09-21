import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';
import '../styles/Message.css';

function Message({ sender, text }) {
  return (
    <div className={`message ${sender}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer">
              {props.children}
            </a>
          ),
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
        {text}
      </ReactMarkdown>
    </div>
  );
}

export default Message;
