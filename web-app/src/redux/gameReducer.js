const defaultState = {
  uuid: null,
  numberOfBombs: 8,
  sizeX: 10,
  sizeY: 10,
  hasStarted: false,
  hasWon: false,
  hasLost: false,
  board: [[]]
};

const ACTION_START = "start";
const ACTION_STOP = "stop";
const ACTION_SET_SIZE_X = "setSizeX";
const ACTION_SET_SIZE_Y = "setSizeY";
const ACTION_SET_NUMBER_OF_BOMBS = "setBombs";
const ACTION_SET_UUID = "setUUID";
const ACTION_SET_CELLS = "setCell";
const ACTION_SET_LOST = "setLost";
const ACTION_SET_WON = "setWon";

export const startAC = () => ({ type: ACTION_START });
export const stopAC = () => ({ type: ACTION_STOP });
export const setSizeXAC = sizeX => ({
  type: ACTION_SET_SIZE_X,
  sizeX: Number.parseInt(sizeX)
});
export const setSizeYAC = sizeY => ({
  type: ACTION_SET_SIZE_Y,
  sizeY: Number.parseInt(sizeY)
});
export const setNumberOfBombs = numberOfBombs => ({
  type: ACTION_SET_NUMBER_OF_BOMBS,
  numberOfBombs: Number.parseInt(numberOfBombs)
});
export const setUUID = uuid => ({
  type: ACTION_SET_UUID,
  uuid
});
export const setCells = cellPositions => ({
  type: ACTION_SET_CELLS,
  cellPositions
});
export const setLost = hasLost => ({ type: ACTION_SET_LOST, hasLost });
export const setWon = hasWon => ({ type: ACTION_SET_WON, hasWon });

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_START:
      return {
        ...state,
        board: Array.from({ length: state.sizeY }, y =>
          Array.from({ length: state.sizeX }, x => ({
            bombsTouching: 0,
            isReveald: false,
            isBomb: false
          }))
        ),
        hasStarted: true
      };
    case ACTION_STOP:
      return {
        ...state,
        hasStarted: false,
        hasLost: false,
        board: [[]]
      };
    case ACTION_SET_SIZE_X:
      return {
        ...state,
        sizeX: action.sizeX
      };
    case ACTION_SET_SIZE_Y:
      return {
        ...state,
        sizeY: action.sizeY
      };
    case ACTION_SET_NUMBER_OF_BOMBS:
      return {
        ...state,
        numberOfBombs: action.numberOfBombs
      };
    case ACTION_SET_UUID:
      return {
        ...state,
        uuid: action.uuid
      };
    case ACTION_SET_CELLS:
      return {
        ...state,
        board: state.board.map((row, y) =>
          row.map((cell, x) => {
            const elem = action.cellPositions.find(
              ({ x: updatedX, y: updatedY }) => updatedX === x && updatedY === y
            );
            if (elem) {
              return elem.cell;
            }
            return cell;
          })
        )
      };
    case ACTION_SET_LOST:
      return {
        ...state,
        hasLost: action.hasLost
      };
    case ACTION_SET_WON:
      return {
        ...state,
        hasWon: action.hasWon
      };
    default:
      return state;
  }
};

export const getSizeX = state => state.sizeX;
export const getSizeY = state => state.sizeY;
export const getNumberOfBombs = state => state.numberOfBombs;
export const getBoard = state => state.board;
export const getUUID = state => state.uuid;
export const getHasStarted = state => state.hasStarted;
export const getHasLost = state => state.hasLost;
export const getHasWon = state => state.hasWon;
