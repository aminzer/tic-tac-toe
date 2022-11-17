import { Cell } from '../types';

export const areCellsEqual = (cell1: Cell, cell2: Cell): boolean => (
  cell1.rowIndex === cell2.rowIndex && cell1.columnIndex === cell2.columnIndex
);
