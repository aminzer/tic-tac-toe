import { FocusedCellChange } from '../keyboard';
import { Cell } from '../../types';

const getNewFocusedCell = ({
  prevFocusedCell,
  focusedCellChange,
  boardLimits: { minRowIndex, maxRowIndex, minColumnIndex, maxColumnIndex },
}: {
  prevFocusedCell: Cell;
  focusedCellChange: FocusedCellChange;
  boardLimits: {
    minRowIndex: number;
    maxRowIndex: number;
    minColumnIndex: number;
    maxColumnIndex: number;
  };
}): Cell => {
  let newRowIndex = prevFocusedCell.rowIndex + focusedCellChange.rowDelta;
  let newColumnIndex = prevFocusedCell.columnIndex + focusedCellChange.columnDelta;

  if (newRowIndex < minRowIndex) {
    newRowIndex = maxRowIndex;
  }

  if (newRowIndex > maxRowIndex) {
    newRowIndex = minRowIndex;
  }

  if (newColumnIndex < minColumnIndex) {
    newColumnIndex = maxColumnIndex;
  }

  if (newColumnIndex > maxColumnIndex) {
    newColumnIndex = minColumnIndex;
  }

  return {
    rowIndex: newRowIndex,
    columnIndex: newColumnIndex,
  };
};

export default getNewFocusedCell;
