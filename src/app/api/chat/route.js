const http = require('http');
const { Server } = require('socket.io');

// Create HTTP server
const server = http.createServer();

// Create Socket.IO server
const io = new Server(server, {
  path: '/api/chat', // Ensure this matches the client-side
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for messages
  socket.on('sendMessage', (message) => {
    console.log('Message received:', message);
    // Broadcast the message to all connected clients
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = 3000; // or any other port
server.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}/`);
});
