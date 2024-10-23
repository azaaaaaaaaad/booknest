// server.js (or your equivalent server-side file)
const { Server } = require("socket.io");

// Create a new Socket.IO server
const io = new Server(4000, {
  cors: {
    origin: `${process.env.NEXT_PUBLIC_API_URL}`, // Allow requests from the client-side app
    methods: ["GET", "POST"], // Allowed methods
  },
  path: "/api/chat", // Ensure this matches the client-side configuration
});

// Handle client connection
io.on("connection", (socket) => {
  console.log("A user has connected");

  // Handle incoming messages
  socket.on("sendMessage", (message) => {
    // Broadcast the message to all connected clients
    io.emit("receiveMessage", message);
  });

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("User has disconnected");
  });
});

console.log("Socket.IO server is running on port 4000");

