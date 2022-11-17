import { Cell, CellSequence } from '../../types';
import { areCellsEqual } from '../cell';

export const isSequenceContainsCell = (
  cellSequence: CellSequence | undefined,
  cell: Cell,
): boolean => {
  if (!cellSequence) {
    return false;
  }

  return cellSequence.cells.some((sequenceCell) => (
    areCellsEqual(sequenceCell, cell)
  ));
};
