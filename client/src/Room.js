import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
const ENDPOINT = "http://127.0.0.1:4001";

const Room = () => {
  const room = window.location.pathname.slice(1);
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit("joinRoom", room);
  }, []);
  return <div className="App">{room}</div>;
};

export default Room;
