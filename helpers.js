const { shuffle } = require("lodash");
const words = require("./words");

const getOptions = (pinkStart) => {
  return [
    "pink",
    "pink",
    "pink",
    "pink",
    "pink",
    "pink",
    "pink",
    "pink",
    "teal",
    "teal",
    "teal",
    "teal",
    "teal",
    "teal",
    "teal",
    "teal",
    "bomb",
    "neutral",
    "neutral",
    "neutral",
    "neutral",
    "neutral",
    "neutral",
    "neutral",
    pinkStart ? "pink" : "teal",
  ];
};

const getBoardMap = (pinkStart) => {
  const options = getOptions(pinkStart);
  return shuffle(options);
};

const getBoard = (startingTeam) => {
  const boardMap = getBoardMap(startingTeam === "pink");
  return words.map((word, i) => ({
    word,
    category: boardMap[i],
    guessed: false,
  }));
};

module.exports = { getBoard };
