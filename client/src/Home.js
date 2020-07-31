import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";

const Home = () => {
  const [roomName, setRoomName] = useState("");
  const history = useHistory();
  const createRoom = (room) => {
    history.push(room);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img
          className="App-logo"
          alt="app logo"
          src="https://raw.githubusercontent.com/borisonr/codenames/main/client/src/logo_w.png"
        />
        <p className="noMargin">
          Play Codenames online across multiple devices.
        </p>
        <p>
          To create a new game or join an existing game, enter a Room Name and
          click 'START'.
        </p>
        <form>
          <input
            placeholder="Room Name"
            type="text"
            value={roomName}
            className="input"
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button className="homeButton" onClick={() => createRoom(roomName)}>
            START
          </button>
        </form>
      </header>
    </div>
  );
};

export default Home;
