import { Mark } from '../../../constants';
import { Matrix } from '../../../dataStructures';
import { CellSequence } from '../../../types';
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
