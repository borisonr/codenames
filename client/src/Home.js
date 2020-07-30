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
        <h1>Codenames</h1>
        <p>
          Play Codenames online across multiple devices on a shapink board. To
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
