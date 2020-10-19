import React, { Fragment } from 'react';
import TableRow from './TableRow'
import { NewGameForm } from './NewGameForm';
import GameBoard from './GameBoard';

interface Props {}

interface NewGameInput {
  playername: string,
  boardsize: number
}


const GameController = ({}: Props) => {
  const [showBoard, setShowBoard] = React.useState(false);
  const [showForm, setShowForm] = React.useState(true);
  const [boardInput, setBoardInput] = React.useState({playername: '', boardsize: 0})

  const handleInitBoard = (input: NewGameInput) => {
    setShowBoard(true);
    setShowForm(false);
    setBoardInput(input)
    console.log(`handle input board`, input);
  }

  return <Fragment>
    {showBoard && <GameBoard input={boardInput} /> }
    {showForm && <NewGameForm onSubmit={handleInitBoard} />}
  </Fragment>;
};

export default GameController;
