import React from "react";
import "./App.css";

const Card = ({ card, spymaster, guessWord, gameOver }) => {
  const wordClassName = spymaster ? card.category : "";
  let cardClassName =
    card.guessed || gameOver ? `${card.category}-card` : "card";
  if (spymaster && card.category === "bomb") cardClassName = "bomb-card";
  return (
    <button
      key={card.word}
      onClick={guessWord}
      className={cardClassName}
      disabled={gameOver || spymaster}
    >
      <p className={wordClassName}>{card.word}</p>
      {gameOver && (
        <>
          <a
            href={card.review_html}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Review Card
          </a>
          <br />
          <a
            href={card.content_url}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Full Lesson
          </a>
        </>
      )}
    </button>
  );
};

export default Card;
