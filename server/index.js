const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit('receive_message', data);
  })

  socket.on("typing", ({username, room}) => {
    socket.to(room).emit('user_typing', username);
  })

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  })


})

httpServer.listen(3000, () => {
	console.log("listening on *:3000");
});
