import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import { CellSequence } from '@app/types';
import getCellSequenceLength from '../getCellSequenceLength';
import calculateCellSequence from './calculateCellSequence';

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
