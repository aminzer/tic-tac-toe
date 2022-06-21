import { CellMark, GameRoundStatus } from './constants';
import { List } from './data_structures';

export interface Cell {
  rowIndex: number;
  columnIndex: number;
}

export interface CellSequence {
  cells: Cell[];
  cellMark: CellMark;
}

export type CellMarkMatrix = List<List<CellMark>>;

export interface GameRoundInfo {
  startingCellMark: CellMark;
  status: GameRoundStatus;
  winCellSequence?: CellSequence;
}

export interface GameStatistic {
  winCount: {
    [CellMark.CROSS]: number;
    [CellMark.NOUGHT]: number;
  }
}
