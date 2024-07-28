import { Mark } from '../../../constants';
import { Matrix } from '../../../dataStructures';
import { CellSequence } from '../../../types';
import getCellSequenceLength from '../getCellSequenceLength';
import calculateCellSequence from './calculateCellSequence';

const getTopRightToBottomLeftDiagonalWinCellSequence = (
  markMatrix: Matrix<Mark>,
  {
    winSequenceLength,
  }: {
    winSequenceLength: number;
  },
): CellSequence | null => {
  const { minRowIndex, maxRowIndex, minColumnIndex, maxColumnIndex } = markMatrix;

  for (
    let indexesSum = minRowIndex + minColumnIndex;
    indexesSum <= maxRowIndex + maxColumnIndex;
    indexesSum += 1
  ) {
    let cellSequence: CellSequence | null = null;
    let winCellSequence: CellSequence | null = null;

    for (
      let rowIndex = minRowIndex;
      rowIndex <= Math.max(maxRowIndex, maxColumnIndex);
      rowIndex += 1
    ) {
      const columnIndex = indexesSum - rowIndex;

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

export default getTopRightToBottomLeftDiagonalWinCellSequence;
