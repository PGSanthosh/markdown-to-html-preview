// src/components/LivePreview.js (with Backend Integration)

import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import {marked} from 'marked';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const LivePreview = () => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');


  const handleChange = (event) => {
    const { value } = event.target;
    setMarkdown(value);
    socket.emit('markdown', value);
  };

  useEffect(() => {
    socket.on('html', (data) => {
      setHtml(DOMPurify.sanitize(data));
    });
    return () => {
      socket.off('html');
    };
  }, []);

  // Handle changes to the textarea
//   const handleChange = (event) => {
//     setMarkdown(event.target.value);

//     // Optionally, send markdown to backend for conversion
//     fetch('http://localhost:5000/convert', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'text/plain',
//       },
//       body: event.target.value,
//     })
//       .then((response) => response.text())
//       .then((htmlContent) => {
//         setHtml(htmlContent);
//       });
//   };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Markdown Input - Left Side */}
      <textarea
        placeholder="Enter Markdown here"
        value={markdown}
        onChange={handleChange}
        rows={20}
        style={{
          width: '50%',
          marginRight: '10px',
          padding: '10px',
          fontFamily: 'monospace',
          fontSize: '16px',
          backgroundColor: '#f4f4f4',
          border: '1px solid #ccc',
        }}
      />

      {/* Live HTML Preview - Right Side */}
      <div
        style={{
          width: '50%',
          padding: '10px',
          border: '1px solid #ccc',
          overflowY: 'auto',
          backgroundColor: '#fff',
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
        }}
        dangerouslySetInnerHTML={{ __html: html || marked(markdown) }}  // Render HTML from the backend or local markdown
      />
    </div>
  );
};

export default LivePreview;
