const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { getBoard } = require("./helpers");
const csv = require("csv-parser");
const fs = require("fs");
var path = require("path");
var clientPath = path.join(__dirname, "../client");

const port = process.env.PORT || 4001;

const app = express();
app.use(express.static(path.join(clientPath, "build")));
app.use(express.static(path.join(clientPath, "public")));
app.get("/", function (req, res) {
  res.sendFile(path.join(clientPath, "build", "index.html"));
});
app.get("/:room", function (req, res) {
  res.sendFile(path.join(clientPath, "build", "index.html"));
});

const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`));

const io = socketIo(server);
let WordOptions = [];

// get words
fs.createReadStream("./wordbank.csv")
  .pipe(csv())
  .on("data", ({ word, review_html, content_url }) => {
    WordOptions.push({ word, review_html, content_url });
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });

const teams = ["pink", "teal"];
const nextTeam = { pink: "teal", teal: "pink" };

const startGame = (room) => {
  let startingTeam = teams[Math.floor(Math.random())];
  rooms[room] = {};
  rooms[room].players = [];
  rooms[room].board = getBoard(startingTeam, WordOptions);
  rooms[room].score = {
    pink: startingTeam === "pink" ? 9 : 8,
    teal: startingTeam === "pink" ? 8 : 9,
  };
  rooms[room].currentTurn = startingTeam;
  rooms[room].winner = "";
};

const rooms = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("joinRoom", (room) => {
    roomName = room;
    if (!rooms[room]) {
      startGame(room);
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
      if (guessedWord.category === "pink") {
        rooms[room].score.pink--;
      }
      if (guessedWord.category === "teal") {
        rooms[room].score.teal--;
      }
      if (rooms[room].score.pink === 0 || rooms[room].score.teal === 0) {
        rooms[room].winner = rooms[room].score.pink === 0 ? "pink" : "teal";
        io.to(room).emit("gameOver", rooms[room]);
      } else {
        if (guessedWord.category !== rooms[room].currentTurn) {
          rooms[room].currentTurn = nextTeam[rooms[room].currentTurn];
        }
        io.to(room).emit("wordGuessed", rooms[room]);
      }
    }
  });

  socket.on("endTurn", function (room) {
    rooms[room].currentTurn = nextTeam[rooms[room].currentTurn];
    io.to(room).emit("newTurn", rooms[room]);
  });

  socket.on("newGame", function (room) {
    startGame(room);
    io.to(room).emit("newGame", rooms[room]);
  });
});
