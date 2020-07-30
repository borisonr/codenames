import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./App.css";

const Game = ({ board, role, socket, room }) => {
  const guessWord = (index) => {
    socket.emit("guessWord", index, room);
  };
  return (
    <div className="board">
      {board.map((card, i) => (
        <Card
          key={card.word}
          card={card}
          spymaster={role === "spymaster"}
          guessWord={() => guessWord(i)}
        />
      ))}
    </div>
  );
};

export default Game;
