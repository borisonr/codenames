import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
import Game from "./Game";
const ENDPOINT = "http://127.0.0.1:4001";

const Room = () => {
  const room = window.location.pathname.slice(1);
  const [role, setRole] = useState("player");
  const [boardMap, setBoardMap] = useState([]);
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit("joinRoom", room);
    socket.on("newPlayer", ({ boardMap, players, score }) => {
      setBoardMap(boardMap);
    });
  }, []);
  return (
    <div className="App">
      <h1>{room}</h1>
      <p>Send this link to friends: {window.location.href}</p>

      <Game boardMap={boardMap} role={role} />

      <input
        name="player"
        checked={role === "player"}
        id="player"
        onChange={() => setRole("player")}
        type="radio"
      />
      <label htmlFor="player">Player</label>
      <input
        type="radio"
        name="spymaster"
        checked={role === "spymaster"}
        id="spymaster"
        onChange={() => setRole("spymaster")}
      />
      <label htmlFor="spymaster">Spymaster</label>
    </div>
  );
};

export default Room;
