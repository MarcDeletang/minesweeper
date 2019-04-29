const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const databaseGenerator = require("./database");
const gameDatabase = databaseGenerator();

const app = express();
const port = 9001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

app.post("/game/create", (req, res) => {
  const { sizeX, sizeY, numberOfBombs } = req.body;
  try {
    return res.json(gameDatabase.createGame(sizeX, sizeY, numberOfBombs));
  } catch (e) {
    console.error(e);
    if (e.code) {
      return res.status(e.code).json(e.message);
    }
    return res.status(500).json("unknown");
  }
});

app.get("/games", (req, res) => {
  try {
    return res.json(gameDatabase.listGames());
  } catch (e) {
    console.error(e);
    if (e.code) {
      return res.status(e.code).json(e.message);
    }
    return res.status(500).json("unknown");
  }
});

app.post("/game/:gameId/play", (req, res) => {
  try {
    const { x, y } = req.body;
    return res.json(gameDatabase.playGame(req.params.gameId, x, y));
  } catch (e) {
    console.error(e);
    if (e.code) {
      return res.status(e.code).json(e.message);
    }
    return res.status(500).json("unknown");
  }
});

app.get("/game/:gameId", (req, res) => {
  try {
    return res.json(gameDatabase.getGame(req.params.gameId));
  } catch (e) {
    console.error(e);
    if (e.code) {
      return res.status(e.code).json(e.message);
    }
    return res.status(500).json("unknown");
  }
});

app.get("/game/:gameId/state", (req, res) => {
  try {
    return res.json(gameDatabase.getGameState(req.params.gameId));
  } catch (e) {
    console.error(e);
    if (e.code) {
      return res.status(e.code).json(e.message);
    }
    return res.status(500).json("unknown");
  }
});

app.delete("/game/:gameId", (req, res) => {
  try {
    const { x, y } = req.body;
    return res.json(gameDatabase.play(req.params.gameId, x, y));
  } catch (e) {
    console.error(e);
    if (e.code) {
      return res.status(e.code).json(e.message);
    }
    return res.status(500).json("unknown");
  }
});

server.listen(port, function() {
  console.log("Express server listening on port " + port);
});
