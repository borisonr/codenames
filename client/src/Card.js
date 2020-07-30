import React, { useEffect, useState } from "react";
import "./App.css";

const Card = ({ card, spymaster, guessWord }) => {
  const wordClassName = spymaster ? card.category : "";
  return (
    <div className="card" key={card.word} onClick={guessWord}>
      <p className={wordClassName}>{card.word}</p>
    </div>
  );
};

export default Card;
