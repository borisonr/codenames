import React, { useEffect, useState } from "react";
import { words } from "./words";
import Card from "./Card";
import "./App.css";

const Game = ({ boardMap, role }) => {
  return (
    <div className="board">
      {words.map((word, i) => (
        <Card
          word={word}
          spymaster={role === "spymaster"}
          category={boardMap[i]}
        />
      ))}
    </div>
  );
};

export default Game;
