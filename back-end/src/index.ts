import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 4000

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
