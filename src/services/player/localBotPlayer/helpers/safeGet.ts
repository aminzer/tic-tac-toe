import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';

const safeGet = (
  markMatrix: Matrix<Mark>,
  rowIndex: number,
  columnIndex: number,
): Mark | undefined => {
  if (
    rowIndex < markMatrix.minRowIndex ||
    rowIndex > markMatrix.maxRowIndex ||
    columnIndex < markMatrix.minColumnIndex ||
    columnIndex > markMatrix.maxColumnIndex
  ) {
    return undefined;
  }

  return markMatrix.get(rowIndex, columnIndex);
};

export default safeGet;
