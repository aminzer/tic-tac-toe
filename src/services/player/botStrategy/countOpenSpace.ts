import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import safeGet from './safeGet';

const countOpenSpace = (
  markMatrix: Matrix<Mark>,
  rowIndex: number,
  columnIndex: number,
  deltaRow: number,
  deltaColumn: number,
  opponentMark: Mark,
  maxCount: number,
): number => {
  let count = 0;
  let r = rowIndex + deltaRow;
  let c = columnIndex + deltaColumn;

  while (count < maxCount && safeGet(markMatrix, r, c) !== opponentMark) {
    count += 1;
    r += deltaRow;
    c += deltaColumn;
  }

  return count;
};

export default countOpenSpace;
