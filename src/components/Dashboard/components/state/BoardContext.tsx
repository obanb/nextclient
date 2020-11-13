import { createContext, useReducer } from 'react';

const boardInitialState = {};
const boardContext = createContext(boardInitialState);
const { Provider } = boardContext;

export interface BoardState  {
  player1figureTile: number,
  player2figureTile: number
}

export type BoardActionTypes = 'PLAYER_MOVE'

const boardReducer = (state: BoardState, action) => {
    switch(action.type) {
      case 'action description':
        const newState = {}
        return newState;
      default:
        throw new Error();
    };
};

export { boardReducer }