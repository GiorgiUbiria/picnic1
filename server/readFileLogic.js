const fs = require("fs");
const csv = require("csv-parser");

const results = [];

fs.createReadStream("WhatsgoodlyData-10.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log("Finished");
  });

module.exports = results;
