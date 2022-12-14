const express = require("express");
const cors = require("cors");

const results = require("./readFileLogic");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(201).send(results);
});

app.listen(3000);
