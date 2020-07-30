const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const getBoardMap = require("./helpers");
var path = require("path");
var clientPath = path.join(__dirname, "./client");

const port = process.env.PORT || 4001;

const app = express();
app.use(express.static(path.join(clientPath, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(clientPath, "build", "index.html"));
});

const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`));

const io = socketIo(server);

const teams = ["red", "blue"];
const startGame = (room) => {
  let startingTeam = teams[Math.floor(Math.random())];
  room.boardMap = getBoardMap(startingTeam === "red");
  room.score = {
    red: startingTeam === "red" ? 9 : 8,
    blue: startingTeam === "red" ? 8 : 9,
  };
};

const rooms = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("joinRoom", (room) => {
    roomName = room;
    if (!rooms[room]) {
      rooms[room] = {};
      rooms[room].players = [];
      startGame(rooms[room]);
    }
    socket.join(room);
    var player = { room: room, socketId: socket.id };
    rooms[room].players.push(player);
    io.to(room).emit("newPlayer", rooms[room]);
  });

  socket.on("newGame", function (room) {
    startGame(rooms[room]);
    io.to(room).emit("newGame");
  });
});
