const getConfig = data => ({
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  ...data
});

export const createGame = (sizeX, sizeY, numberOfBombs) =>
  fetch(
    "http://localhost:9001/game/create",
    getConfig({
      method: "post",
      body: JSON.stringify({
        sizeX,
        sizeY,
        numberOfBombs
      })
    })
  ).then(e => e.json());

export const play = (uuid, x, y) =>
  fetch(
    `http://localhost:9001/game/${uuid}/play`,
    getConfig({
      method: "post",
      body: JSON.stringify({
        x,
        y
      })
    })
  ).then(e => e.json());

export const getGame = (uuid, x, y) =>
  fetch(
    `http://localhost:9001/game/${uuid}`,
    getConfig({
      method: "get"
    })
  ).then(e => e.json());
