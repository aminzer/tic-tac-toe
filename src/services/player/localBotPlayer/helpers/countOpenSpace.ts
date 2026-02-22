import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import safeGet from './safeGet';

const countOpenSpace = (
  markMatrix: Matrix<Mark>,
  rowIndex: number,
  columnIndex: number,
  rowDelta: number,
  columnDelta: number,
  opponentMark: Mark,
  maxCount: number,
): number => {
  let count = 0;
  let r = rowIndex + rowDelta;
  let c = columnIndex + columnDelta;

  while (count < maxCount && safeGet(markMatrix, r, c) !== opponentMark) {
    count += 1;
    r += rowDelta;
    c += columnDelta;
  }

  return count;
};

export default countOpenSpace;
