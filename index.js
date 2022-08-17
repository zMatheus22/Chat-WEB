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
  //Alguem efetuou uma conection no server.
  console.log("New Connection");
  //Server Envia a menssagem
  socket.emit("update_messages", messages);

  //Back end envia o "data" para o Front end, neste caso o front end só utiliza o "user" e "messagem"
  socket.on("new_message", (data) => {
    messages.push(data);

    io.emit("update_messages", messages);
  });
});
