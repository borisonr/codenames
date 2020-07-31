const csv = require("csv-parser");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
var checkWord = require("check-word"),
  words = checkWord("en");

const wordbank = [];

const csvWriter = createCsvWriter({
  path: "wordbank.csv",
  header: [
    { id: "word", title: "Word" },
    { id: "url", title: "URL" },
  ],
});

fs.createReadStream("./codename_deck.csv")
  .pipe(csv())
  .on("data", ({ word, url }) => {
    if (words.check(word)) {
      wordbank.push({ word, url });
    }
    csvWriter
      .writeRecords(wordbank)
      .then(() => console.log("The CSV file was written successfully"));
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });
