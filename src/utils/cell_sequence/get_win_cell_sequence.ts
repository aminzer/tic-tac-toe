import { Mark } from '../../constants';
import { Matrix } from '../../data_structures';
import { CellSequence } from '../../types';
import { calculateCellSequence } from './calculate_cell_sequence';

export const getWinCellSequence = (markMatrix: Matrix<Mark>, {
  winSequenceLength = 5,
}: {
  winSequenceLength?: number;
} = {}): CellSequence | null => {
  const {
    minRowIndex,
    maxRowIndex,
    minColumnIndex,
    maxColumnIndex,
  } = markMatrix;

  let cellSequence: CellSequence | null = null;

  // check for horizontal mark sequences
  for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex++) {
    cellSequence = null;

    for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex++) {
      const cell = { rowIndex, columnIndex };
      const mark = markMatrix.get(rowIndex, columnIndex);

      cellSequence = calculateCellSequence(cellSequence, cell, mark);

      if (cellSequence?.cells?.length === winSequenceLength) {
        return cellSequence;
      }
    }
  }

  // check for vertical mark sequences
  for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex++) {
    cellSequence = null;

    for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex++) {
      const cell = { rowIndex, columnIndex };
      const mark = markMatrix.get(rowIndex, columnIndex);

      cellSequence = calculateCellSequence(cellSequence, cell, mark);

      if (cellSequence?.cells?.length === winSequenceLength) {
        return cellSequence;
      }
    }
  }

  // check for diagonal mark sequences (top-left -> bottom-right)
  for (let indexesSum = minRowIndex + minColumnIndex; indexesSum <= maxRowIndex + maxColumnIndex; indexesSum++) {
    cellSequence = null;

    for (let rowIndex = minRowIndex; rowIndex <= Math.max(maxRowIndex, maxColumnIndex); rowIndex++) {
      const columnIndex = indexesSum - rowIndex;

      if (rowIndex < minRowIndex || rowIndex > maxRowIndex || columnIndex < minColumnIndex || columnIndex > maxColumnIndex) {
        continue;
      }

      const cell = { rowIndex, columnIndex };
      const mark = markMatrix.get(rowIndex, columnIndex);

      cellSequence = calculateCellSequence(cellSequence, cell, mark);

      if (cellSequence?.cells?.length === winSequenceLength) {
        return cellSequence;
      }
    }
  }

  // check for diagonal mark sequences (bottom-left -> top-right)
  for (let indexesDiff = minRowIndex - maxColumnIndex; indexesDiff <= maxRowIndex - minColumnIndex; indexesDiff++) {
    cellSequence = null;

    for (let rowIndex = minRowIndex; rowIndex <= Math.max(maxRowIndex, maxColumnIndex); rowIndex++) {
      const columnIndex = rowIndex - indexesDiff;

      if (rowIndex < minRowIndex || rowIndex > maxRowIndex || columnIndex < minColumnIndex || columnIndex > maxColumnIndex) {
        continue;
      }

      const cell = { rowIndex, columnIndex };
      const mark = markMatrix.get(rowIndex, columnIndex);

      cellSequence = calculateCellSequence(cellSequence, cell, mark);

      if (cellSequence?.cells?.length === winSequenceLength) {
        return cellSequence;
      }
    }
  }

  return null;
};
