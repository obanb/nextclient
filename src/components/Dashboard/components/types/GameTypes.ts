
export interface PlayerFigure {
  id: string;
  figureProps: {
    name: string;
    desc: string;
    attrs: {};
    move: {};
  };
  boardPosition: string;
  owner: string;
}

export interface PlayerFigurePositions {[boardPosition:string]:PlayerFigure}
