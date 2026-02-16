import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import safeGet from './safeGet';

const countConsecutive = (
  markMatrix: Matrix<Mark>,
  rowIndex: number,
  columnIndex: number,
  rowDelta: number,
  columnDelta: number,
  targetMark: Mark,
): number => {
  let count = 0;
  let r = rowIndex + rowDelta;
  let c = columnIndex + columnDelta;

  while (safeGet(markMatrix, r, c) === targetMark) {
    count += 1;
    r += rowDelta;
    c += columnDelta;
  }

  return count;
};

export default countConsecutive;
