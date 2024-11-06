import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const Editor = () => {
  const [markdown, setMarkdown] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setMarkdown(value);
    socket.emit('markdown', value);
  };

  return (
    <div className="editor-container">
      <textarea
        className="markdown-editor"
        value={markdown}
        onChange={handleChange}
        placeholder="Type Markdown here..."
      />
    </div>
  );
};

export default Editor;