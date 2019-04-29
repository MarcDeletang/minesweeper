import React, { useCallback } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import { css } from "emotion";
import { setLost, setCells, setWon, getUUID } from "../redux/gameReducer";
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
      uuid: getUUID(state)
    }),
    []
  );
  const { uuid } = useMappedState(mapState);

  const dispatch = useDispatch();
  const onClick = useCallback(
    event => {
      if (isRevealed) {
        return;
      }
      play(uuid, x, y).then(data => {
        dispatch(setLost(data.hasLost));
        dispatch(setWon(data.hasWon));
        dispatch(setCells(data.cellsPlayed));
      });
    },
    [dispatch, uuid, x, y, isRevealed]
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
