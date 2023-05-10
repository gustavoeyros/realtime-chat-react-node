import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 3005;

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5173" },
});

io.on("connection", (socket) => {
  console.log("Usuário conectado!", socket.id);
  socket.on("set_username", (username) => {
    socket.data.username = username;
    console.log(socket.data.username);
  });
});

httpServer.listen(PORT, () => console.log("Server running on port " + PORT));
