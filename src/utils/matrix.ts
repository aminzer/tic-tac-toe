import { Matrix } from '../data_structures';
import { Cell } from '../types';

export const increaseMatrixSizeBeyondBoundaryCell = <T,>(matrix: Matrix<T>, cell: Cell): void => {
  if (cell.rowIndex === matrix.minRowIndex) {
    matrix.minRowIndex--;
  }

  if (cell.rowIndex === matrix.maxRowIndex) {
    matrix.maxRowIndex++;
  }

  if (cell.columnIndex === matrix.minColumnIndex) {
    matrix.minColumnIndex--;
  }

  if (cell.columnIndex === matrix.maxColumnIndex) {
    matrix.maxColumnIndex++;
  }
};
