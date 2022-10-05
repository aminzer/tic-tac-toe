import { Cell, CellSequence } from "../../types";

export const isSequenceContainsCell = (
  cellSequence: CellSequence | undefined,
  cell: Cell,
): boolean => {
  if (!cellSequence) {
    return false;
  }

  return cellSequence.cells.some(({ rowIndex, columnIndex }) => {
    return cell.rowIndex === rowIndex && cell.columnIndex === columnIndex;
  });
};
