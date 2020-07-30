const { shuffle } = require("lodash");
const words = require("./words");

const getOptions = (redStart) => {
  return [
    "red",
    "red",
    "red",
    "red",
    "red",
    "red",
    "red",
    "red",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "bomb",
    "neutral",
    "neutral",
    "neutral",
    "neutral",
    "neutral",
    "neutral",
    "neutral",
    redStart ? "red" : "blue",
  ];
};

const getBoardMap = (redStart) => {
  const options = getOptions(redStart);
  return shuffle(options);
};

const getBoard = (startingTeam) => {
  const boardMap = getBoardMap(startingTeam === "red");
  return words.map((word, i) => ({
    word,
    category: boardMap[i],
    guessed: false,
  }));
};

module.exports = { getBoard };
