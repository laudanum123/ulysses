// src/mockAssistantResponses.js

export const mockAssistantResponses = [
  // Responses for User Message 1
  [
    {
      text: `Certainly! Here's a basic example of the useState hook:

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`
`,
    },
    {
      text: `The \`useState\` hook allows you to add state to functional components. In the example above, \`count\` is the state variable, and \`setCount\` is the function to update it.`,
    },
    {
      text: `**Final Answer:** The useState hook is essential for managing state in functional React components, enabling dynamic and interactive user interfaces.`,
    },
  ],
  // Responses for User Message 2
  [
    {
      text: `Certainly! Here's an example using the useEffect hook:

\`\`\`javascript
import React, { useEffect } from 'react';

function Example() {
  useEffect(() => {
    // Code to run on component mount
    console.log('Component mounted');
  }, []); // Empty dependency array ensures it runs once
}
\`\`\`
`,
    },
    {
      text: `The \`useEffect\` hook serves a similar purpose to \`componentDidMount\`, but it's more versatile. \`useEffect\` can run after every render or conditionally based on dependencies, whereas \`componentDidMount\` runs only once after the first render.`,
    },
    {
      text: `**Final Answer:** The useEffect hook in React provides a powerful way to handle side effects in functional components, offering greater flexibility compared to lifecycle methods like componentDidMount.`,
    },
  ],
  // Add more grouped responses as needed
];
