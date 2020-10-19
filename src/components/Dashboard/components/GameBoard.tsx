import React, { Fragment } from 'react';

interface Props {
  input: {
    boardsize: number,
    playername: string
  }
}

const BoardTile = () => {
  return <div>tile</div>
}

const GameBoard = ({input}: Props) => {
  const tiles = [];

  const renderTiles = () => {
    for (let i = 0; i < input.boardsize; i++) {
      console.log(`tile ${i} from ${input.boardsize}`)
      tiles.push(<BoardTile key={i} />);
    }
  }
  renderTiles();

  return <Fragment>
    {
      tiles.map(tile => {
        return tile;
      })
    }
  </Fragment>
};

export default GameBoard;
