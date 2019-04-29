// 2 routes:

// Create game -> n m b -> numbers, voir pour la gestion d'erreurs

// Play -> n m
// -> fail
// -> success: [{ x, y }]
// -> finalSuccess

// Game -> 0 pas joué, 1 bombe, 2 joué
// Game -> { bombsTouching: nb, isPlayed: false }, { isBomb: true, isPlayed: false }
// Cell : { bombsTouching: nb, isRevealed: false, isBomb: false }, {  bombsTouching: nb, isRevealed: false, isBomb: true  }

//  [
//  [0, 0],
//  [0, 0],
//  [0, 0]
// ];

//  x: 5
//  y: 2

// 10
// 7 -> / 5 -> 1
const getPosition = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// going anti-clockwise, starting top
const getNeighboursCells = (x, y, sizeX, sizeY) =>
  [
    () => (y > 0 ? { x, y: y - 1 } : null),
    () => (y > 0 && x > 0 ? { x: x - 1, y: y - 1 } : null),
    () => (x > 0 ? { x: x - 1, y } : null),
    () => (y < sizeY - 1 && x > 0 ? { x: x - 1, y: y + 1 } : null),
    () => (y < sizeY - 1 ? { x, y: y + 1 } : null),
    () => (y < sizeY - 1 && x < sizeX - 1 ? { x: x + 1, y: y + 1 } : null),
    () => (x < sizeX - 1 ? { x: x + 1, y } : null),
    () => (y > 0 && x < sizeX - 1 ? { x: x + 1, y: y - 1 } : null)
  ]
    .map(x => x())
    .filter(e => e !== null);

const incrementBombCountNeighboursCells = (x, y, sizeX, sizeY, board) => {
  getNeighboursCells(x, y, sizeX, sizeY).forEach(
    e => (board[e.y][e.x].bombsTouching = board[e.y][e.x].bombsTouching + 1)
  );
};

const getRealPosition = (positionsSet, sizeX, sizeY) => {
  const x = getPosition(0, sizeX - 1);
  const y = getPosition(0, sizeY - 1);

  while (positionsSet.find(el => el.x === sizeX || el.y === sizeY)) {
    return getRealPosition(positionsSet, sizeX, sizeY);
  }
  return { x, y };
};

const initGame = (sizeX, sizeY, numberOfBombs) => {
  const board = Array.from({ length: sizeY }, y =>
    Array.from({ length: sizeX }, x => ({
      bombsTouching: 0,
      isRevealed: false,
      isBomb: false
    }))
  );

  const positionsSet = [];
  for (let i = 0; i !== numberOfBombs; i++) {
    const { x, y } = getRealPosition(positionsSet, sizeX, sizeY);

    if (board[y][x].isBomb === true) {
      --i;
      continue;
    }
    const t = board[y][x];
    board[y][x] = {
      bombsTouching: board[y][x].bombsTouching,
      isBomb: true,
      isRevealed: false
    };
    incrementBombCountNeighboursCells(x, y, sizeX, sizeY, board);
    positionsSet.push({ x, y });
  }
  return board;
};

const _play = (x, y, sizeX, sizeY, board, cellsPlayed) => {
  board[y][x].isRevealed = true;
  cellsPlayed.push({ x, y, cell: board[y][x] });

  getNeighboursCells(x, y, sizeX, sizeY).map(
    ({ x: neighboursX, y: neighboursY }) => {
      const elem = board[neighboursY][neighboursX];
      if (elem.isRevealed) {
        return;
      }
      elem.isRevealed = true;
      cellsPlayed.push({ x: neighboursX, y: neighboursY, cell: elem });
      if (elem.bombsTouching === 0 && !elem.isBomb) {
        return _play(
          neighboursX,
          neighboursY,
          sizeX,
          sizeY,
          board,
          cellsPlayed
        );
      }
    }
  );
};

const checkVictory = board => {
  for (let y = 0; y !== board.length; ++y) {
    for (let x = 0; x !== board[y].length; ++x) {
      if (!board[y][x].isBomb && !board[y][x].isRevealed) {
        return false;
      }
    }
  }
  return true;
};

const revealBombs = board =>
  board.forEach(row =>
    row.forEach(c => {
      c.isRevealed = true;
    })
  );

const getBombCells = board =>
  board.reduce((acc, row, y) => {
    const newElems = row
      .map((cell, x) => ({ cell, x, y }))
      .filter(({ cell }) => cell.isBomb);
    return [...acc, ...newElems];
  }, []);

const play = (x, y, board) => {
  const cellsPlayed = [];
  if (board[y][x].isBomb) {
    revealBombs(board);
    return {
      hasLost: true,
      hasWon: false,
      message: "You lost",
      cellsPlayed: getBombCells(board)
    };
  }
  if (board[y][x].bombsTouching !== 0) {
    board[y][x].isRevealed = true;
    if (checkVictory(board)) {
      return {
        hasLost: false,
        success: true,
        hasWon: true,
        cellsPlayed: [{ x, y, cell: board[y][x] }]
      };
    }
    return {
      hasLost: false,
      hasWon: false,
      success: true,
      cellsPlayed: [{ x, y, cell: board[y][x] }]
    };
  } else {
    _play(x, y, board[0].length, board.length, board, cellsPlayed);
    if (checkVictory(board)) {
      return {
        hasLost: false,
        success: true,
        hasWon: true,
        cellsPlayed
      };
    }
  }
  return { success: true, cellsPlayed, hasWon: false };
};

const cheatGame = board =>
  board
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

const getGameRevealed = board =>
  board
    .map((row, y) =>
      row.map((cell, x) => ({
        cell,
        x,
        y
      }))
    )
    .reduce(
      (acc, row) => {
        return {
          ...acc,
          x: row.length,
          cellsPlayed: [
            ...acc.cellsPlayed,
            ...row.filter(({ cell }) => cell.isRevealed)
          ]
        };
      },
      { y: board.length, x: 0, cellsPlayed: [] }
    );

module.exports.initGame = initGame;
module.exports.play = play;
module.exports.cheatGame = cheatGame;
module.exports.getGameRevealed = getGameRevealed;
