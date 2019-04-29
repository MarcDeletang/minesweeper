import React, { useCallback } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import { css } from "emotion";

import {
  getSizeX,
  getSizeY,
  getHasStarted,
  getNumberOfBombs,
  getUUID,
  setSizeXAC,
  setSizeYAC,
  setNumberOfBombs,
  setUUID,
  startAC,
  stopAC,
  setIsWatching,
  setCells
} from "../redux/gameReducer";
import { createGame, getGame } from "../services/apiCall";

export const Form = () => {
  const mapState = useCallback(
    state => ({
      sizeX: getSizeX(state),
      sizeY: getSizeY(state),
      numberOfBombs: getNumberOfBombs(state),
      uuid: getUUID(state),
      hasStarted: getHasStarted(state)
    }),
    []
  );
  const { sizeX, sizeY, numberOfBombs, uuid, hasStarted } = useMappedState(
    mapState
  );

  const dispatch = useDispatch();
  const changeSizeX = useCallback(
    event => dispatch(setSizeXAC(event.target.value)),
    [dispatch]
  );
  const changeSizeY = useCallback(
    event => dispatch(setSizeYAC(event.target.value)),
    [dispatch]
  );
  const changeNumberOfBombs = useCallback(
    event => dispatch(setNumberOfBombs(event.target.value)),
    [dispatch]
  );
  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      dispatch(startAC());
      createGame(sizeX, sizeY, numberOfBombs).then(({ uuid }) =>
        dispatch(setUUID(uuid))
      );
    },
    [dispatch, sizeX, sizeY, numberOfBombs]
  );
  const quitGameUI = useCallback(() => dispatch(stopAC()), [dispatch]);

  //lol
  const setUUIDUI = useCallback(e => dispatch(setUUID(e.target.value)), [
    dispatch
  ]);

  const getGameUI = useCallback(() => {
    getGame(uuid).then(cells => dispatch(setCells(cells)));
  }, [dispatch, uuid]);

  const setIsWatchingUI = useCallback(() => dispatch(setIsWatching(true)), [
    dispatch
  ]);

  return (
    <form
      onSubmit={onSubmit}
      className={css`
        min-height: 10vh;
      `}
    >
      <div>
        <label>
          Length of the board
          <input
            value={sizeX}
            onChange={changeSizeX}
            placeholder="Size X"
            type="number"
            name="sizeX"
            min={1}
            readOnly={hasStarted}
            required
          />
        </label>
        <label>
          Height of the board
          <input
            value={sizeY}
            onChange={changeSizeY}
            placeholder="Size Y"
            type="number"
            name="sizeY"
            min={1}
            required
            readOnly={hasStarted}
          />
        </label>

        <label>
          Number of bombs
          <input
            value={numberOfBombs}
            onChange={changeNumberOfBombs}
            placeholder="Number of bombs"
            type="number"
            name="numberOfBombs"
            min={1}
            readOnly={hasStarted}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Game id
          <input
            value={uuid}
            onChange={setUUIDUI}
            placeholder="Game uuid"
            type="text"
            name="gameUUID"
            readOnly={hasStarted}
          />
        </label>
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <button
          className={css`
            align-self: flex-start;
            padding: 0.5em;
            background-color: blue;
            color: white;
          `}
          type="submit"
        >
          Click to start the game
        </button>
        <button
          className={css`
            align-self: flex-start;
            padding: 0.5em;
            background-color: black;
            color: white;
          `}
          type="button"
          onClick={quitGameUI}
        >
          Click to quit the game
        </button>
        <button
          className={css`
            align-self: flex-end;
            padding: 0.5em;
            background-color: orange;
            color: white;
          `}
          type="button"
          onClick={getGameUI}
        >
          Cheat game
        </button>
        <button
          className={css`
            align-self: flex-end;
            padding: 0.5em;
            background-color: orange;
            color: white;
          `}
          type="button"
          onClick={setIsWatchingUI}
        >
          Watch game
        </button>
      </div>
    </form>
  );
};
