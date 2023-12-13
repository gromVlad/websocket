import { log } from "console";
import express from "express"
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3001;

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("<h1>Hello<h1/>");
});

io.on("connect", (socket) => {
  debugger
  console.log("a user connected");
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
