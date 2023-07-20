import { Matrix } from '../dataStructures';
import { getCentralCell } from './matrix';

describe('utils > matrix > getCentralCell', () => {
  describe('when there is a cell that is placed in exact center', () => {
    const matrix = new Matrix({
      minRowIndex: 1,
      maxRowIndex: 5,
      minColumnIndex: -1,
      maxColumnIndex: 5,
    });

    it('returns central cell', () => {
      expect(getCentralCell(matrix)).toEqual({
        rowIndex: 3,
        columnIndex: 2,
      });
    });
  });

  describe('when there is no cell that is placed in exact center', () => {
    const matrix = new Matrix({
      minRowIndex: 1,
      maxRowIndex: 4,
      minColumnIndex: -1,
      maxColumnIndex: 4,
    });

    it('returns cell near center that is closer to lower index', () => {
      expect(getCentralCell(matrix)).toEqual({
        rowIndex: 2,
        columnIndex: 1,
      });
    });
  });
});
