import React, { useEffect, useState } from "react";
import "./App.css";

const Card = ({ card, spymaster, guessWord }) => {
  const wordClassName = spymaster ? card.category : "";
  const cardClassName = card.guessed ? `${card.category}-card` : "card";
  return (
    <div onClick={guessWord} className={cardClassName}>
      <p className={wordClassName}>{card.word}</p>
    </div>
  );
};

export default Card;
