import React from "react";
import Card from "./Card";
import "./App.css";

const Game = ({ board, role, socket, room, gameOver }) => {
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
          gameOver={gameOver}
        />
      ))}
    </div>
  );
};

export default Game;
