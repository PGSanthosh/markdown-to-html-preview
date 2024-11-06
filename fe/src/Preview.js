import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const Preview = () => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    socket.on('html', (data) => {
      setHtml(DOMPurify.sanitize(data));
    });
    return () => {
      socket.off('html');
    };
  }, []);

  return (
    <div className="preview-container">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default Preview;