import React, { useEffect, useState } from "react";
import "./App.css";

const Card = ({ word, spymaster, category }) => {
  const wordClassName = spymaster ? category : "";
  return (
    <div className="card" key={word}>
      <p className={wordClassName}>{word}</p>
    </div>
  );
};

export default Card;
