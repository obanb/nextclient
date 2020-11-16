import React, { createContext, useReducer } from 'react';
import { Endomorphism } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import { keyof } from 'io-ts';
import * as R from 'fp-ts/lib/Record';
import { Nullable } from 'apollo-client/benchmark/util';

const boardInitialState = {
  tileTargeted: 0,
  figureTargeted: 0
};

export interface BoardState {
  tileTargeted: number;
  figureTargeted: number;
}
const setTileTargeted = (state: BoardState, action: BoardActions)  => pipe(state)

const actionHandlers: {[key:string] : (state:BoardState,action: BoardActions) => BoardState}= {
  SET_TILE_TARGETED: setTileTargeted,
}

type BoardActions = { type: 'SET_TILE_TARGETED', payload: string } | { type: 'SET_TILE_TARGETET', payload: number }


const boardReducer = (state: BoardState = boardInitialState, action: (BoardActions)) => {
  return pipe(
    O.fromNullable(actionHandlers[action.type]),
    O.map(f => f(state, action)),
    O.getOrElse(() => state)
  )
};

export const BoardReadContext = React.createContext<BoardState>(boardInitialState);
export const BoardWriteContext = React.createContext<Nullable<React.Dispatch<BoardActions>>>(null);

export const BoardContextProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(boardReducer, boardInitialState);

  return (
    <BoardReadContext.Provider value={state}>
      <BoardWriteContext.Provider value={dispatch}>{children}</BoardWriteContext.Provider>
    </BoardReadContext.Provider>
  );
};


