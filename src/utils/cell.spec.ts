import { Cell } from '../types';
import { areCellsEqual } from './cell';

describe('utils > cell > areCellsEqual', () => {
  describe('when cells are equal', () => {
    const cell1: Cell = { rowIndex: 1, columnIndex: 2 };
    const cell2: Cell = { rowIndex: 1, columnIndex: 2 };

    it('returns true', () => {
      expect(areCellsEqual(cell1, cell2)).toBe(true);
    });
  });

  describe('when cells are not equal', () => {
    const cell1: Cell = { rowIndex: 1, columnIndex: 2 };
    const cell2: Cell = { rowIndex: 1, columnIndex: 3 };

    it('returns false', () => {
      expect(areCellsEqual(cell1, cell2)).toBe(false);
    });
  });
});
