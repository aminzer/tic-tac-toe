import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import { CellSequence } from '@app/types';
import getCellSequenceLength from '../getCellSequenceLength';
import calculateCellSequence from './calculateCellSequence';

const getTopLeftToBottomRIghtDiagonalWinCellSequence = (
  markMatrix: Matrix<Mark>,
  {
    winSequenceLength,
  }: {
    winSequenceLength: number;
  },
): CellSequence | null => {
  const { minRowIndex, maxRowIndex, minColumnIndex, maxColumnIndex } = markMatrix;

  let cellSequence: CellSequence | null = null;
  let winCellSequence: CellSequence | null = null;

  for (
    let indexesDiff = minRowIndex - maxColumnIndex;
    indexesDiff <= maxRowIndex - minColumnIndex;
    indexesDiff += 1
  ) {
    cellSequence = null;
    winCellSequence = null;

    for (
      let rowIndex = minRowIndex;
      rowIndex <= Math.max(maxRowIndex, maxColumnIndex);
      rowIndex += 1
    ) {
      const columnIndex = rowIndex - indexesDiff;

      if (
        rowIndex < minRowIndex ||
        rowIndex > maxRowIndex ||
        columnIndex < minColumnIndex ||
        columnIndex > maxColumnIndex
      ) {
        continue;
      }

      const cell = { rowIndex, columnIndex };
      const mark = markMatrix.get(rowIndex, columnIndex);

      cellSequence = calculateCellSequence(cellSequence, cell, mark);

      if (getCellSequenceLength(cellSequence) >= winSequenceLength) {
        winCellSequence = cellSequence;
      }
    }

    if (winCellSequence) {
      return winCellSequence;
    }
  }

  return null;
};

export default getTopLeftToBottomRIghtDiagonalWinCellSequence;
