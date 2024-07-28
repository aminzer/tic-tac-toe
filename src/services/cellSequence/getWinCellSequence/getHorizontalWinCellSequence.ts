import { Mark } from '../../../constants';
import { Matrix } from '../../../dataStructures';
import { CellSequence } from '../../../types';
import calculateCellSequence from '../calculateCellSequence';
import getCellSequenceLength from '../getCellSequenceLength';

const getHorizontalWinCellSequence = (
  markMatrix: Matrix<Mark>,
  {
    winSequenceLength,
  }: {
    winSequenceLength: number;
  },
): CellSequence | null => {
  const { minRowIndex, maxRowIndex, minColumnIndex, maxColumnIndex } = markMatrix;

  for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex += 1) {
    let cellSequence: CellSequence | null = null;
    let winCellSequence: CellSequence | null = null;

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

  return null;
};

export default getHorizontalWinCellSequence;
