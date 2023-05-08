import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const PORT = 3001;

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5173" },
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
