require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
const port = process.env.PORT | 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(` App listening on port ${port}`);
});
