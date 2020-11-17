import React, { createContext, useReducer } from 'react';
import { pipe } from 'fp-ts/lib/pipeable';
import * as O from 'fp-ts/lib/Option';

/**
 * Types
 */

export interface BoardState {
  tileTargeted: number;
  figureTargeted: number;
}

type SET_TILE_TARGETED = { type: 'SET_TILE_TARGETED', payload: number };
type SET_FIGURE_TARGETED = { type: 'SET_TILE_TARGETED', payload: number };

type BoardActions =
  SET_TILE_TARGETED |
  SET_FIGURE_TARGETED

type BoardActionImpl = (state: BoardState, action: BoardActions) => BoardState;

interface ActionHandler {[key:string] : BoardActionImpl}

/**
 * Impl
 */

const boardInitialState = {
  tileTargeted: 0,
  figureTargeted: 0
};

const setTileTargeted = (state: BoardState, action: SET_TILE_TARGETED):BoardState => pipe({...state, tileTargeted: action.payload})
const setFigureTargeted = (state: BoardState, action: SET_FIGURE_TARGETED): BoardState => pipe({...state, figureTargeted: action.payload})

const actionHandler: ActionHandler = {
  SET_TILE_TARGETED: setTileTargeted,
  SET_FIGURE_TARGETED: setFigureTargeted
}

const boardReducer = (state: BoardState = boardInitialState, action: (BoardActions)) => {
  return pipe(
    actionHandler[action.type],
    O.fromNullable,
    O.map(f => f(state, action)),
    O.getOrElse(() => {
      return state;
    })
  )
};

 const BoardReadContext = React.createContext<BoardState>(boardInitialState);
 const BoardDispatchContext = React.createContext<React.Dispatch<BoardActions>>(null);

 const BoardContext = ({children}) => {
  const [state, dispatch] = React.useReducer(boardReducer, boardInitialState);

  return (
    <BoardReadContext.Provider value={state}>
      <BoardDispatchContext.Provider value={dispatch}>{children}</BoardDispatchContext.Provider>
    </BoardReadContext.Provider>
  );
};

 const useBoardReadContext = () => React.useContext(BoardReadContext);
 const useBoardDispatchContext = () => React.useContext(BoardDispatchContext);

export { BoardContext, useBoardReadContext, useBoardDispatchContext };