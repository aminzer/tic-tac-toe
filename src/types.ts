import { Mark, GameRoundStatus } from './constants';
import { List } from './data_structures';

export interface Cell {
  rowIndex: number;
  columnIndex: number;
}

export interface CellSequence {
  cells: Cell[];
  mark: Mark;
}

export type MarkMatrix = List<List<Mark>>;

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
