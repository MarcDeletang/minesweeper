const uuidv4 = require("uuid/v4");
const { initGame, play } = require("./service");

const gameDatabase = () => {
  const games = {};

  const createGame = (sizeX, sizeY, numberOfBombs) => {
    const game = initGame(sizeX, sizeY, numberOfBombs);
    const uuid = uuidv4();
    games[uuid] = game;
    return { uuid };
  };

  const listGames = () => Object.keys(games);

  const playGame = (gameId, x, y) => {
    if (!games[gameId]) {
      throw { code: 400, message: "Game doesn't exists" };
    }
    return play(x, y, games[gameId]);
  };

  const getGame = gameId => {
    if (!games[gameId]) {
      throw { code: 400, message: "Game doesn't exists" };
    }
    return games[gameId]
      .map((row, y) =>
        row.map((cell, x) => ({
          cell: { ...cell, isRevealed: true },
          x,
          y
        }))
      )
      .reduce((acc, row) => {
        return [...acc, ...row];
      }, []);
  };

  return {
    createGame,
    listGames,
    getGame,
    playGame
  };
};

module.exports = gameDatabase;
