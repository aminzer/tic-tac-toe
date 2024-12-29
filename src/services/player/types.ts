import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import { Cell } from '@app/types';

export interface Player {
  getMark: () => Mark;

  getNextCellToMark: (markMatrix: Matrix<Mark>) => Promise<Cell>;

  resolveNextCellToMark?: (cell: Cell) => void;
}
