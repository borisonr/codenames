const { shuffle } = require("lodash");

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

module.exports = getBoardMap;
