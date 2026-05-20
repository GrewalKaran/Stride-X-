require("dotenv").config();

const app = require("./src/app");
const connectDb = require("./src/config/database");

const http = require("http");
const { Server } = require("socket.io");

connectDb();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://stride-rlhtafyjh-grewalkarans-projects.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join-room", (roomCode) => {
    socket.join(roomCode);
    console.log(`${socket.id} joined room ${roomCode}`);
  });

  socket.on("start-race", (roomCode) => {
    io.to(roomCode).emit("race-started");
  });

  socket.on("location-update", (data) => {
    socket.to(data.roomCode).emit("opponent-location", {
      position: data.position,
      distance: data.distance,
      seconds: data.seconds,
    });
  });

  socket.on("player-finished", (data) => {
    socket.to(data.roomCode).emit("opponent-finished", data);
  });

  socket.on("race-completed", (roomCode) => {
    io.to(roomCode).emit("race-completed");
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});