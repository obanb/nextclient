import React, { Fragment, ReactElement } from 'react';

interface Props {
  input: {
    boardsize: number,
    playername: string
  }
}

interface TileDesc {
  positionX: number,
  positionY: number,
  normalizedPosition: number,
  component: ReactElement<any, any>
}

const BoardTile = ({positionY, positionX}) => {
  return <div className={styles.tile}>{positionX} | {positionY}</div>
}

const GameBoard = ({input}: Props) => {
  const tiles: TileDesc[] = [];

  const renderTiles = () => {
    for (let i = 0; i < input.boardsize; i++) {
      console.log(`tile ${i} from ${input.boardsize}`)
      tiles.push({
        positionX: i,
        positionY: i,
        normalizedPosition: i + i,
        component: <BoardTile key={i} positionX={i} positionY={i} />
      }
      );
    }
  }
  renderTiles();

  return <Fragment>
    {
      tiles.map(tile => {
        return tile.component;
      })
    }
  </Fragment>
};

const styles = {
  tile: "border-2 border-gray-600 h-16 w-16"
}

export default GameBoard;
