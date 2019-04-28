import React, { useCallback } from "react";
import { useMappedState } from "redux-react-hook";
// import { css } from "emotion";
import {
  getSizeX,
  getSizeY,
  getBoard,
  getHasLost,
  getHasWon,
  getHasStarted
} from "../redux/gameReducer";
import { Board } from "./board";
import { Form } from "./form";

export const Game = () => {
  const mapState = useCallback(
    state => ({
      sizeX: getSizeX(state),
      sizeY: getSizeY(state),
      board: getBoard(state),
      hasStarted: getHasStarted(state),
      hasLost: getHasLost(state),
      hasWon: getHasWon(state)
    }),
    []
  );
  const { sizeX, sizeY, board, hasStarted, hasLost, hasWon } = useMappedState(
    mapState
  );

  return (
    <div>
      <Form />
      {hasLost ? "You loose, try again" : ""}
      {hasWon ? "Congratulation you have won" : ""}
      <Board board={board} sizeX={sizeX} sizeY={sizeY} />
    </div>
  );
};
