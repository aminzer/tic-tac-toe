import areCellsEqual from '../areCellsEqual';

describe('utils > cell > areCellsEqual', () => {
  describe('when cells have different row and column indexes', () => {
    const cell1 = { rowIndex: 1, columnIndex: 2 };
    const cell2 = { rowIndex: 2, columnIndex: 3 };

    it('returns true', () => {
      expect(areCellsEqual(cell1, cell2)).toBe(false);
    });
  });

  describe('when cells have different row indexes', () => {
    const cell1 = { rowIndex: 1, columnIndex: 2 };
    const cell2 = { rowIndex: 2, columnIndex: 2 };

    it('returns false', () => {
      expect(areCellsEqual(cell1, cell2)).toBe(false);
    });
  });

  describe('when cells have different column indexes', () => {
    const cell1 = { rowIndex: 1, columnIndex: 2 };
    const cell2 = { rowIndex: 1, columnIndex: 3 };

    it('returns false', () => {
      expect(areCellsEqual(cell1, cell2)).toBe(false);
    });
  });

  describe('when cells have equal row and column indexes', () => {
    const cell1 = { rowIndex: 1, columnIndex: 2 };
    const cell2 = { rowIndex: 1, columnIndex: 2 };

    it('returns true', () => {
      expect(areCellsEqual(cell1, cell2)).toBe(true);
    });
  });
});
