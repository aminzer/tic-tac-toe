import { Mark, GameRoundStatus } from './constants';

export interface Cell {
  rowIndex: number;
  columnIndex: number;
}

export interface CellSequence {
  cells: Cell[];
  mark: Mark;
}

export interface MatrixSizes {
  minRowIndex: number;
  maxRowIndex: number;
  minColumnIndex: number;
  maxColumnIndex: number;
}

export interface GameRoundInfo {
  startingMark: Mark;
  status: GameRoundStatus;
  winCellSequence?: CellSequence;
}

export interface GameStatistic {
  winCount: {
    [Mark.CROSS]: number;
    [Mark.NOUGHT]: number;
  }
}
