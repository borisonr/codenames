import React, { useEffect, useState } from "react";
import "./App.css";

const Card = ({ card, spymaster, guessWord, gameOver }) => {
  const wordClassName = spymaster ? card.category : "";
  const cardClassName = card.guessed ? `${card.category}-card` : "card";
  return (
    <button
      onClick={guessWord}
      className={cardClassName}
      disabled={gameOver || spymaster}
    >
      <p className={wordClassName}>{card.word}</p>
    </button>
  );
};

export default Card;
