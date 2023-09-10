import { Cell } from '../../types';

const areCellsEqual = (cell1: Cell, cell2: Cell): boolean => {
  return cell1.rowIndex === cell2.rowIndex && cell1.columnIndex === cell2.columnIndex;
};

export default areCellsEqual;
