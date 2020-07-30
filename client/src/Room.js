import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
import Game from "./Game";
const ENDPOINT = "http://127.0.0.1:4001";

const Room = () => {
  const room = window.location.pathname.slice(1);
  const [role, setRole] = useState("player");
  const [winner, setWinner] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState({});
  const [socket, setSocket] = useState(undefined);
  const [currentTurn, setCurrentTurn] = useState(score.startingTeam);
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    setSocket(socket);
    socket.emit("joinRoom", room);
    socket.on("newPlayer", ({ board, currentTurn, score }) => {
      setBoard(board);
      setScore(score);
      setCurrentTurn(currentTurn);
    });

    socket.on("newGame", ({ board, currentTurn, score }) => {
      setBoard(board);
      setScore(score);
      setCurrentTurn(currentTurn);
    });
    socket.on("newTurn", ({ board, currentTurn, score }) => {
      setCurrentTurn(currentTurn);
    });
    socket.on("wordGuessed", ({ board, currentTurn, score }) => {
      setScore(score);
      setBoard(board);
    });

    socket.on("gameOver", ({ board, currentTurn, score, winner }) => {
      setGameOver(true);
      setWinner(winner);
      setBoard(board);
      setScore(score);
    });
    return () => socket.disconnect();
  }, []);

  const endTurn = () => {
    socket.emit("endTurn", room);
  };

  const startNewGame = () => {
    socket.emit("newGame", room);
  };

  return (
    <div className="App">
      <h1>{room}</h1>
      <p>Send this link to friends: {window.location.href}</p>

      <p>
        <span className="red">{score.red}</span>-
        <span className="blue">{score.blue}</span>
      </p>
      {gameOver ? (
        <p>{winner} wins</p>
      ) : (
        <>
          <p className={currentTurn}>{currentTurn}'s turn</p>
          <button onClick={endTurn}>End {currentTurn}'s turn</button>
        </>
      )}
      <Game
        board={board}
        role={role}
        socket={socket}
        room={room}
        gameOver={gameOver}
      />

      <input
        name="player"
        checked={role === "player"}
        id="player"
        onChange={() => setRole("player")}
        type="radio"
        disabled={gameOver}
      />
      <label htmlFor="player">Player</label>
      <input
        type="radio"
        name="spymaster"
        checked={role === "spymaster"}
        id="spymaster"
        onChange={() => setRole("spymaster")}
        disabled={gameOver}
      />
      <label htmlFor="spymaster">Spymaster</label>

      <button onClick={startNewGame}>New Game</button>
    </div>
  );
};

export default Room;
