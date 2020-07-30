import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
const ENDPOINT = "http://127.0.0.1:4001";

const App = () => {
  const [response, setResponse] = useState("");
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Codenames</h1>
        <p>
          Play Codenames online across multiple devices on a shared board. To
          create a new game or join an existing game, enter a game identifier
          and click 'GO'.
        </p>
        <input placeholder="Room Name" />
        <button>Go</button>
      </header>
    </div>
  );
};

export default App;
