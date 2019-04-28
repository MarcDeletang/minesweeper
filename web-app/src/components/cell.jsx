import React, { useCallback } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import { css } from "emotion";
import {
  setLost,
  getSizeX,
  getSizeY,
  setCells,
  setWon,
  getBoard,
  getUUID
} from "../redux/gameReducer";
import { play } from "../services/apiCall";

const cellColors = [
  "background-color: lightblue;",
  "background-color: green;",
  "background-color: yellow;",
  "background-color: darkgoldenrod;",
  "background-color: orange;",
  "background-color: darkorange;",
  "background-color: red;",
  "background-color: darkred;",
  "background-color: darkgray;",
  "background-color: grey;",
  "background-color: black;"
];

const getCellColor = (isBomb, bombsTouching, isRevealed) => {
  if (!isRevealed) {
    return cellColors[cellColors.length - 2];
  }
  if (isBomb) {
    return cellColors[cellColors.length - 1];
  }
  return cellColors[bombsTouching];
};

const Cell = props => {
  const {
    cell: { bombsTouching, isBomb, isRevealed },
    x,
    y
  } = props;
  const mapState = useCallback(
    state => ({
      sizeX: getSizeX(state),
      sizeY: getSizeY(state),
      board: getBoard(state),
      uuid: getUUID(state)
    }),
    []
  );
  const { sizeX, sizeY, board, uuid } = useMappedState(mapState);

  const dispatch = useDispatch();
  const onClick = useCallback(
    event => {
      play(uuid, x, y).then(data => {
        if (!data.success) {
          dispatch(setLost(true));
          return;
        }
        dispatch(setWon(data.hasWon));
        dispatch(setCells(data.cellsPlayed));
      });
    },
    [dispatch, uuid, x, y]
  );
  return (
    <div
      className={css`
        grid-column-start: auto;
        grid-row-start: auto;
        border: white 2px solid;
        text-align: center;
        ${getCellColor(isBomb, bombsTouching, isRevealed)}
      `}
      onClick={onClick}
    >
      {bombsTouching !== 0 ? bombsTouching : ""}
    </div>
  );
};
export { Cell };
