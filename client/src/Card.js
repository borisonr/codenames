import React, { useEffect, useState } from "react";
import "./App.css";

const Card = ({ word, spymaster }) => {
  const wordClassName = spymaster ? "red" : "";
  return (
    <div className="card">
      <p className={wordClassName}>{word}</p>
    </div>
  );
};

export default Card;
