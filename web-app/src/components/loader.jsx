import React, { useEffect, useCallback } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";

import {
  getUUID,
  setCells,
  setSizeXAC,
  setSizeYAC,
  startAC
} from "../redux/gameReducer";
import { getGameState } from "../services/apiCall";

export const Loader = ({ refreshTime }) => {
  const mapState = useCallback(
    state => ({
      uuid: getUUID(state)
    }),
    []
  );
  const { uuid } = useMappedState(mapState);

  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(
      () =>
        getGameState(uuid).then(data => {
          const { cellsPlayed, x, y } = data;
          dispatch(setSizeXAC(x));
          dispatch(setSizeYAC(y));
          dispatch(startAC());
          dispatch(setCells(cellsPlayed));
        }),
      refreshTime
    );

    return () => {
      clearInterval(interval);
    };
  }, [refreshTime, uuid, dispatch]);
  return <div>Watching a game</div>;
};
