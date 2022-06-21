import { CellMark } from '../constants';
import { Cell, CellSequence, CellMarkMatrix } from '../types';

const winSequenceLength = 2; // TODO 5

export const getWinCellSequence = (cellMarkMatrix: CellMarkMatrix): CellSequence | undefined => {
  const minRowIndex = cellMarkMatrix.minIndex;
  const maxRowIndex = cellMarkMatrix.maxIndex;

  const minColumnIndex = cellMarkMatrix.get(0).minIndex;
  const maxColumnIndex = cellMarkMatrix.get(0).maxIndex;

  const cellSequence: CellSequence = {
    cells: [],
    cellMark: CellMark.CROSS,
  };

  const calculateCellSequence = (cellSequence: CellSequence, nextCell: Cell): void => {
    const nextCellMark = cellMarkMatrix.get(nextCell.rowIndex).get(nextCell.columnIndex);

    if (!nextCellMark || nextCellMark !== cellSequence.cellMark) {
      cellSequence.cells = [];
    }

    cellSequence.cells.push(nextCell);
    cellSequence.cellMark = nextCellMark;
  }

  // check for horizontal mark sequences
  for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex++) {
    cellSequence.cells = [];

    for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex++) {
      calculateCellSequence(cellSequence, { rowIndex, columnIndex });

      if (cellSequence.cells.length === winSequenceLength) {
        return cellSequence;
      }
    }
  }

  // check for vertical mark sequences
  for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex++) {
    cellSequence.cells = [];

    for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex++) {
      calculateCellSequence(cellSequence, { rowIndex, columnIndex });

      if (cellSequence.cells.length === winSequenceLength) {
        return cellSequence;
      }
    }
  }

  // check for diagonal mark sequences (top-left -> bottom-right)
  for (let indexesSum = minRowIndex + minColumnIndex; indexesSum <= maxRowIndex + maxColumnIndex; indexesSum++) {
    cellSequence.cells = [];

    for (let rowIndex = minRowIndex; rowIndex <= Math.max(maxRowIndex, maxColumnIndex); rowIndex++) {
      const columnIndex = indexesSum - rowIndex;

      if (rowIndex < minRowIndex || rowIndex > maxRowIndex || columnIndex < minColumnIndex || columnIndex > maxColumnIndex) {
        continue;
      }

      calculateCellSequence(cellSequence, { rowIndex, columnIndex });

      if (cellSequence.cells.length === winSequenceLength) {
        return cellSequence;
      }
    }
  }

  // check for diagonal mark sequences (bottom-left -> top-right)
  for (let indexesDiff = minRowIndex - maxColumnIndex; indexesDiff <= maxRowIndex - minColumnIndex; indexesDiff++) {
    cellSequence.cells = [];

    for (let rowIndex = minRowIndex; rowIndex <= Math.max(maxRowIndex, maxColumnIndex); rowIndex++) {
      const columnIndex = rowIndex - indexesDiff;

      if (rowIndex < minRowIndex || rowIndex > maxRowIndex || columnIndex < minColumnIndex || columnIndex > maxColumnIndex) {
        continue;
      }

      calculateCellSequence(cellSequence, { rowIndex, columnIndex });

      if (cellSequence.cells.length === winSequenceLength) {
        return cellSequence;
      }
    }
  }

  return undefined;
};
