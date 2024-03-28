import { formatTestName } from '../../test';
import Matrix from '../Matrix';

describe(formatTestName(__filename), () => {
  let matrix: Matrix<string>;

  beforeEach(() => {
    matrix = new Matrix<string>({
      minRowIndex: 0,
      maxRowIndex: 1,
      minColumnIndex: 100,
      maxColumnIndex: 101,
    });

    matrix.set(0, 100, 'a');
    matrix.set(0, 101, 'b');
    matrix.set(1, 100, 'c');
    matrix.set(1, 100, 'd');
  });

  describe('mapRows', () => {
    it('return array of results of calls of callback for each matrix row', () => {
      const x = matrix.mapRows(
        (row) =>
          `#${row.index} ${row
            .mapColumns((cell) => `[${cell.rowIndex}:${cell.columnIndex}]`)
            .join(',')}`,
      );

      expect(x).toEqual(['#0 [0:100],[0:101]', '#1 [1:100],[1:101]']);
    });
  });

  describe('mapColumns', () => {
    it('return array of results of calls of callback for each matrix column', () => {
      const x = matrix.mapColumns(
        (column) =>
          `#${column.index} ${column
            .mapRows((cell) => `[${cell.rowIndex}:${cell.columnIndex}]`)
            .join(',')}`,
      );

      expect(x).toEqual(['#100 [0:100],[1:100]', '#101 [0:101],[1:101]']);
    });
  });
});
