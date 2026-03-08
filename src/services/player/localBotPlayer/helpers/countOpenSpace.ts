import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import safeGet from './safeGet';

const countOpenSpace = ({
  markMatrix,
  startRowIndex,
  startColumnIndex,
  rowDelta,
  columnDelta,
  opponentMark,
  maxCount,
}: {
  markMatrix: Matrix<Mark>;
  startRowIndex: number;
  startColumnIndex: number;
  rowDelta: number;
  columnDelta: number;
  opponentMark: Mark;
  maxCount: number;
}): number => {
  let count = 0;

  let rowIndex = startRowIndex + rowDelta;
  let columnIndex = startColumnIndex + columnDelta;

  while (count < maxCount && safeGet(markMatrix, rowIndex, columnIndex) !== opponentMark) {
    count += 1;

    rowIndex += rowDelta;
    columnIndex += columnDelta;
  }

  return count;
};

export default countOpenSpace;
