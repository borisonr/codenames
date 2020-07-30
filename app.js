const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { getBoard } = require("./helpers");
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
const nextTeam = { red: "blue", blue: "red" };

const startGame = (room) => {
  let startingTeam = teams[Math.floor(Math.random())];
  room.board = getBoard(startingTeam);
  room.score = {
    red: startingTeam === "red" ? 9 : 8,
    blue: startingTeam === "red" ? 8 : 9,
  };
  room.currentTurn = startingTeam;
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

  socket.on("guessWord", function (index, room) {
    const guessedWord = rooms[room].board[index];
    guessedWord.guessed = true;
    if (guessedWord.category === "bomb") {
      rooms[room].winner = nextTeam[rooms[room].currentTurn];
      io.to(room).emit("gameOver", rooms[room]);
    } else {
      if (guessedWord.category === "red") {
        rooms[room].score.red--;
      }
      if (guessedWord.category === "blue") {
        rooms[room].score.blue--;
      }
      if (rooms[room].score.red === 0 || rooms[room].score.blue === 0) {
        rooms[room].winner = rooms[room].score.red === 0 ? "red" : "blue";
        io.to(room).emit("gameOver", rooms[room]);
      } else {
        io.to(room).emit("wordGuessed", rooms[room]);
      }
    }
  });

  socket.on("endTurn", function (room) {
    rooms[room].currentTurn = nextTeam[rooms[room].currentTurn];
    io.to(room).emit("newTurn", rooms[room]);
  });

  socket.on("newGame", function (room) {
    startGame(rooms[room]);
    io.to(room).emit("newGame");
  });
});
