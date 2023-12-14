const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const route = require("./route");
const {addUser} = require("./users");

const app = express();

app.use(cors({ origin: "*" }));

app.use(route);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    socket.join(room);

    const { user } = addUser({ name, room })

    socket.emit("message", {
      data: { user: { name: "Admin" }, message: `Hey ${name}` },
    });

    //отправляет сообщение события "message" всем клиентам в указанной комнате, за исключением текущего сокета
    //на примере при подключении шлет всем сообщением всем user в текущей комнате кроме подключившегося
    socket.broadcast.to(user.room).emit('message', {
      data: { user: { name: "Admin" }, message: `${user.name} has joined ` },
    })
  });

  io.on("disconnect", () => {
    console.log("disconnect");
  });
});

server.listen(5000, () => {
  console.log("server is running on port 5000");
});