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
    socket.on("newPlayer", ({ board, currentTurn, score, winner }) => {
      setBoard(board);
      setScore(score);
      setCurrentTurn(currentTurn);
      setGameOver(!!winner);
      setWinner(winner);
    });

    socket.on("newGame", ({ board, currentTurn, score, winner }) => {
      setBoard(board);
      setScore(score);
      setCurrentTurn(currentTurn);
      setGameOver(false);
      setWinner(winner);
    });
    socket.on("newTurn", ({ currentTurn }) => {
      setCurrentTurn(currentTurn);
    });
    socket.on("wordGuessed", ({ board, currentTurn, score }) => {
      setScore(score);
      setBoard(board);
      setCurrentTurn(currentTurn);
    });

    socket.on("gameOver", ({ board, score, winner }) => {
      setGameOver(true);
      setWinner(winner);
      setBoard(board);
      setScore(score);
    });
    return () => socket.disconnect();
  }, [room, winner]);

  const endTurn = () => {
    socket.emit("endTurn", room);
  };

  const startNewGame = () => {
    socket.emit("newGame", room);
  };

  return board.length ? (
    <div className="App">
      <img
        src="https://raw.githubusercontent.com/borisonr/codenames/main/client/src/logo_w.png"
        alt="app logo"
        className="roomLogo"
      />
      {gameOver ? (
        <>
          <p className={currentTurn}>GAME OVER</p>
          <p className={currentTurn}>{winner?.toUpperCase()} WINS</p>
          <p>
            Learn more about these terms on Codecademy by clicking on the cards'
            links
          </p>
        </>
      ) : (
        <>
          <p className={currentTurn}>{currentTurn?.toUpperCase()}'S TURN</p>
          <button className="bigbutton" onClick={endTurn}>
            End {currentTurn}'s turn
          </button>
        </>
      )}
      <div className="scoreContainer">
        <p>
          SCORE: <span className="pink">{score.pink}</span>-
          <span className="teal">{score.teal}</span>
        </p>
      </div>
      <Game
        board={board}
        role={role}
        socket={socket}
        room={room}
        gameOver={gameOver}
      />
      <div className="boardFooter">
        <div>
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
        </div>
        <button className="bigbutton" onClick={startNewGame}>
          New Game
        </button>
      </div>
      <p className="noMargin">Send this link to friends:</p>
      <p className="noMargin">{window.location.href}</p>
    </div>
  ) : null;
};

export default Room;
