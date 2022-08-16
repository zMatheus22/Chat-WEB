const express = require("express");
const socketIO = require("socket.io");
const app = express();
const PORT = 3000;
const path = require("path");

app.use("/", express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () => {
  console.log("Server Aberto!");
});

const messages = [];

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New Connection");
  socket.emit("update_messages", messages);

  socket.on("new_message", (data) => {
    messages.push(data);

    io.emit("update_messages", messages);
  });
});
