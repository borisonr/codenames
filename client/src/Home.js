import React, { useState } from "react";
import socketIOClient from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
const ENDPOINT = "http://127.0.0.1:4001";

const Home = () => {
  const [roomName, setRoomName] = useState("");
  const createRoom = (room) => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit("joinRoom", room);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Codenames</h1>
        <p>
          Play Codenames online across multiple devices on a shared board. To
          create a new game or join an existing game, enter a game identifier
          and click 'GO'.
        </p>
        <form>
          <input
            placeholder="Room Name"
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button onClick={() => createRoom(roomName)}>Go</button>
        </form>
      </header>
    </div>
  );
};

export default Home;
