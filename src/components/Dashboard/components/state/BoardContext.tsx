import { createContext, useReducer } from 'react';
import { Endomorphism } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';

const boardInitialState = {};
const boardContext = createContext(boardInitialState);
const { Provider } = boardContext;

export interface BoardState {
  tileTargeted: number;
  figureTargeted: number;
}

export enum BoardActionTypes {
  targetTile = 'TARGET_TILE',
  targetFigure = 'TARGET_TILE',
  clearTargets = 'CLEAR_TARGETS',
}

type SetTileTargeted = Endomorphism<BoardState>;
const setTileTargeted: SetTileTargeted = (state: BoardState) => pipe(state);

const boardReducer = (state: BoardState, action) => {
  switch (action.type) {
    case BoardActionTypes.targetTile:
      const newState = { ...state, tileTargeted: action.payload };
      return newState;
    default:
      throw new Error();
  }
};

export { boardReducer };
