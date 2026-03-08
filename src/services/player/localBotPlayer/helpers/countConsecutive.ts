import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import safeGet from './safeGet';

const countConsecutive = ({
  markMatrix,
  startRowIndex,
  startColumnIndex,
  rowDelta,
  columnDelta,
  targetMark,
}: {
  markMatrix: Matrix<Mark>;
  startRowIndex: number;
  startColumnIndex: number;
  rowDelta: number;
  columnDelta: number;
  targetMark: Mark;
}): number => {
  let count = 0;

  let rowIndex = startRowIndex + rowDelta;
  let columnIndex = startColumnIndex + columnDelta;

  while (safeGet(markMatrix, rowIndex, columnIndex) === targetMark) {
    count += 1;

    rowIndex += rowDelta;
    columnIndex += columnDelta;
  }

  return count;
};

export default countConsecutive;
