import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import safeGet from './safeGet';

const countConsecutive = (
  markMatrix: Matrix<Mark>,
  rowIndex: number,
  columnIndex: number,
  deltaRow: number,
  deltaColumn: number,
  targetMark: Mark,
): number => {
  let count = 0;
  let r = rowIndex + deltaRow;
  let c = columnIndex + deltaColumn;

  while (safeGet(markMatrix, r, c) === targetMark) {
    count += 1;
    r += deltaRow;
    c += deltaColumn;
  }

  return count;
};

export default countConsecutive;
