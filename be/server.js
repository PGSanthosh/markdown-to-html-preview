const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const MarkdownIt = require('markdown-it');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3002",
      methods: ["GET", "POST"]
    }
  });



const markdownIt = new MarkdownIt();

const PORT = process.env.PORT || 4000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('markdown', (markdown) => {
    const html = markdownIt.render(markdown);
    io.emit('html', html);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});