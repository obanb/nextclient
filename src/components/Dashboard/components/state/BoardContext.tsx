import React, { createContext, useReducer } from 'react';
import { pipe } from 'fp-ts/lib/pipeable';
import * as O from 'fp-ts/lib/Option';
import { PlayerFigurePositions } from '../types/GameTypes';

/**
 * Types
 */

export interface BoardState {
  tileTargeted: string;
  figureTargeted: string;
  possibleMoves: string[],
  figurePositions: {};
}

type SET_TILE_TARGETED = { type: 'SET_TILE_TARGETED'; payload: string };
type SET_FIGURE_TARGETED = { type: 'SET_FIGURE_TARGETED'; payload: string };

type BoardActions = SET_TILE_TARGETED | SET_FIGURE_TARGETED;

type BoardActionImpl = (state: BoardState, action: BoardActions) => BoardState;

interface ActionHandler {
  [key: string]: BoardActionImpl;
}

/**
 * Impl
 */

const setInitialFigurePositions = (): PlayerFigurePositions =>
  pipe({
    tile5: {
      id: 'figure1',
      boardPosition: 'tile5',
      owner: 'me',
      figureProps: {
        name: 'vampire',
        desc: 'vampire figure',
        attrs: {},
        move: {},
      },
    },
    tile22: {
      id: 'figure2',
      boardPosition: 'tile22',
      owner: 'me',
      figureProps: {
        name: 'vampire',
        desc: 'vampire figure',
        attrs: {},
        move: {},
      },
    },
  });

// const recomputeBoardPositions = (figureState: FigureState) => {
//   return [...figureState.player1, ...figureState.player2].reduce(
//     (acu, next) => {
//       acu[next.boardPosition] = next.id;
//       return acu;
//     },
//     {},
//   );
// };

const boardInitialState = {
  tileTargeted: '',
  figureTargeted: '',
  possibleMoves: [],
  figurePositions: setInitialFigurePositions(),
};

const setTileTargeted = (
  state: BoardState,
  action: SET_TILE_TARGETED,
): BoardState => {
  console.log('tile targeted', action.payload);
  return pipe({
    ...state,
    tileTargeted: action.payload,
    figureTargeted: undefined,
    figurePositions: {
      ...state.figurePositions,
      [state.figureTargeted]: undefined,
      [action.payload]: state.figureTargeted,
    },
  });
};
const setFigureTargeted = (
  state: BoardState,
  action: SET_FIGURE_TARGETED,
): BoardState => {
  console.log('figure targeted', action.payload);
  return pipe({ ...state, figureTargeted: action.payload, possibleMoves: [] });
};

const actionHandler: ActionHandler = {
  SET_TILE_TARGETED: setTileTargeted,
  SET_FIGURE_TARGETED: setFigureTargeted,
};

const boardReducer = (
  state: BoardState = boardInitialState,
  action: BoardActions,
) => {
  return pipe(
    actionHandler[action.type],
    O.fromNullable,
    O.map((f) => f(state, action)),
    O.getOrElse(() => {
      return state;
    }),
  );
};

const BoardReadContext = React.createContext<BoardState>(boardInitialState);
const BoardDispatchContext = React.createContext<React.Dispatch<BoardActions>>(
  null,
);

const BoardContext = ({ children }) => {
  const [state, dispatch] = React.useReducer(boardReducer, boardInitialState);

  return (
    <BoardReadContext.Provider value={state}>
      <BoardDispatchContext.Provider value={dispatch}>
        {children}
      </BoardDispatchContext.Provider>
    </BoardReadContext.Provider>
  );
};

const useBoardReadContext = () => React.useContext(BoardReadContext);
const useBoardDispatchContext = () => React.useContext(BoardDispatchContext);

export { BoardContext, useBoardReadContext, useBoardDispatchContext };
