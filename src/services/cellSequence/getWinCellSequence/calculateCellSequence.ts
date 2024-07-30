import { Mark } from '../../../constants';
import { Cell, CellSequence } from '../../../types';

const calculateCellSequence = (
  cellSequence: CellSequence | null,
  nextCell: Cell,
  nextMark?: Mark,
): CellSequence | null => {
  if (!nextMark) {
    return null;
  }

  const cells =
    cellSequence?.mark === nextMark ? [...(cellSequence?.cells ?? []), nextCell] : [nextCell];

  return {
    cells,
    mark: nextMark,
  };
};

export default calculateCellSequence;