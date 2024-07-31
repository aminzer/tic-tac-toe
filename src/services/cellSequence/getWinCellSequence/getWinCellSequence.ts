import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import { CellSequence } from '@app/types';
import getHorizontalWinCellSequence from './getHorizontalWinCellSequence';
import getTopLeftToBottomRIghtDiagonalWinCellSequence from './getTopLeftToBottomRIghtDiagonalWinCellSequence';
import getTopRightToBottomLeftDiagonalWinCellSequence from './getTopRightToBottomLeftDiagonalWinCellSequence';
import getVerticalWinCellSequence from './getVerticalWinCellSequence';

const getWinCellSequence = (
  markMatrix: Matrix<Mark>,
  {
    winSequenceLength = 5,
  }: {
    winSequenceLength?: number;
  } = {},
): CellSequence | null => {
  return (
    getHorizontalWinCellSequence(markMatrix, { winSequenceLength }) ??
    getVerticalWinCellSequence(markMatrix, { winSequenceLength }) ??
    getTopLeftToBottomRIghtDiagonalWinCellSequence(markMatrix, { winSequenceLength }) ??
    getTopRightToBottomLeftDiagonalWinCellSequence(markMatrix, { winSequenceLength })
  );
};

export default getWinCellSequence;
