import React, { Fragment } from "react";
import { css } from "emotion";
import { Cell } from "./cell";

export const Board = ({ board, sizeX, sizeY }) => (
  <div
    className={css`
      display: grid;
      grid-template-rows: repeat(${sizeY}, ${90 / sizeY}vh);
      grid-template-columns: repeat(${sizeX}, auto);
    `}
  >
    {board.map((row, y) => (
      <Fragment key={y}>
        {row.map((cell, x) => (
          <Cell key={x} cell={cell} x={x} y={y} />
        ))}
      </Fragment>
    ))}
  </div>
);
