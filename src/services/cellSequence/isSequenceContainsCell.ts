import { Cell, CellSequence } from '../../types';
import { areCellsEqual } from '../cell';

const isSequenceContainsCell = (
  cellSequence: Pick<CellSequence, 'cells'> | undefined,
  cell: Cell,
): boolean => {
  if (!cellSequence) {
    return false;
  }

  return cellSequence.cells.some((sequenceCell) => areCellsEqual(sequenceCell, cell));
};

export default isSequenceContainsCell;
