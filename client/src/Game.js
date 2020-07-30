import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./App.css";

const Game = ({ board, role, socket, room }) => {
  const guessWord = (word) => {
    socket.emit("guessWord", word, room);
  };
  return (
    <div className="board">
      {board.map((card, i) => (
        <Card
          card={card}
          spymaster={role === "spymaster"}
          guessWord={() => guessWord(card.word)}
        />
      ))}
    </div>
  );
};

export default Game;
