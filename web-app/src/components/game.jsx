import React, { useCallback } from "react";
import { useMappedState } from "redux-react-hook";
// import { css } from "emotion";
import {
  getSizeX,
  getSizeY,
  getBoard,
  getHasLost,
  getHasWon,
  getIsWatching
} from "../redux/gameReducer";
import { Board } from "./board";
import { Form } from "./form";
import { Loader } from "./loader";

export const Game = () => {
  const mapState = useCallback(
    state => ({
      sizeX: getSizeX(state),
      sizeY: getSizeY(state),
      board: getBoard(state),
      hasLost: getHasLost(state),
      hasWon: getHasWon(state),
      isWatching: getIsWatching(state)
    }),
    []
  );
  const { sizeX, sizeY, board, hasLost, hasWon, isWatching } = useMappedState(
    mapState
  );

  return (
    <div>
      <Form />
      {isWatching && <Loader refreshTime={1000} />}
      {hasLost ? "You loose, try again" : ""}
      {hasWon ? "Congratulation you have won" : ""}
      <Board board={board} sizeX={sizeX} sizeY={sizeY} />
    </div>
  );
};
