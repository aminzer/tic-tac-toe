/* eslint-disable no-param-reassign */

import { Matrix } from '../dataStructures';
import { Cell } from '../types';

export const increaseMatrixSizeBeyondBoundaryCell = <T>(matrix: Matrix<T>, cell: Cell): void => {
  if (cell.rowIndex === matrix.minRowIndex) {
    matrix.minRowIndex -= 1;
  }

  if (cell.rowIndex === matrix.maxRowIndex) {
    matrix.maxRowIndex += 1;
  }

  if (cell.columnIndex === matrix.minColumnIndex) {
    matrix.minColumnIndex -= 1;
  }

  if (cell.columnIndex === matrix.maxColumnIndex) {
    matrix.maxColumnIndex += 1;
  }
};

export const getCentralCell = <T>(matrix: Matrix<T>): Cell => ({
  rowIndex: Math.floor((matrix.maxRowIndex + matrix.minRowIndex) / 2),
  columnIndex: Math.floor((matrix.maxColumnIndex + matrix.minColumnIndex) / 2),
});
