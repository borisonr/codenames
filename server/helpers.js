const { shuffle } = require("lodash");

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

const getBoard = (startingTeam, WordOptions) => {
  const boardMap = getBoardMap(startingTeam === "pink");
  const words = [];
  for (let i = 0; i <= 24; i++) {
    words.push(WordOptions[Math.floor(Math.random() * WordOptions.length)]);
  }
  return words.map(({ word, review_html, content_url }, i) => ({
    word,
    category: boardMap[i],
    guessed: false,
    review_html,
    content_url,
  }));
};

module.exports = { getBoard };
