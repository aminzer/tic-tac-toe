/* eslint-disable no-param-reassign */

import { Matrix } from '../data_structures';
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
