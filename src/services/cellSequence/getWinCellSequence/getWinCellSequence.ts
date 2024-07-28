import { Mark } from '../../../constants';
import { Matrix } from '../../../dataStructures';
import { CellSequence } from '../../../types';
import calculateCellSequence from '../calculateCellSequence';
import getCellSequenceLength from '../getCellSequenceLength';

const getWinCellSequence = (
  markMatrix: Matrix<Mark>,
  {
    winSequenceLength = 5,
  }: {
    winSequenceLength?: number;
  } = {},
): CellSequence | null => {
  const { minRowIndex, maxRowIndex, minColumnIndex, maxColumnIndex } = markMatrix;

  let cellSequence: CellSequence | null = null;
  let winCellSequence: CellSequence | null = null;

  // check for horizontal mark sequences
  for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex += 1) {
    cellSequence = null;
    winCellSequence = null;

    for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex += 1) {
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

  // check for vertical mark sequences
  for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex += 1) {
    cellSequence = null;
    winCellSequence = null;

    for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex += 1) {
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

  // check for diagonal mark sequences (top-right -> bottom-left)
  for (
    let indexesSum = minRowIndex + minColumnIndex;
    indexesSum <= maxRowIndex + maxColumnIndex;
    indexesSum += 1
  ) {
    cellSequence = null;
    winCellSequence = null;

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

  // check for diagonal mark sequences (top-left -> bottom-right)
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

export default getWinCellSequence;
