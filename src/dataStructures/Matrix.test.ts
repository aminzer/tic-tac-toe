import { Cell, MatrixSizes } from '../types';
import Matrix from './Matrix';

describe('dataStructures > Matrix', () => {
  describe('constructor', () => {
    interface ConstructorTestCase {
      params?: Partial<MatrixSizes>;
      expectations: MatrixSizes & {
        rowCount: number;
        columnCount: number;
      } | {
        error: true;
      };
    }

    const constructorTestCases: ConstructorTestCase[] = [
      {
        params: undefined,
        expectations: {
          minRowIndex: 0,
          maxRowIndex: -1,
          rowCount: 0,
          minColumnIndex: 0,
          maxColumnIndex: -1,
          columnCount: 0,
        },
      },
      {
        params: {
          maxRowIndex: 2,
        },
        expectations: {
          minRowIndex: 0,
          maxRowIndex: 2,
          rowCount: 3,
          minColumnIndex: 0,
          maxColumnIndex: -1,
          columnCount: 0,
        },
      },
      {
        params: {
          minRowIndex: 2,
          maxRowIndex: 3,
        },
        expectations: {
          minRowIndex: 2,
          maxRowIndex: 3,
          rowCount: 2,
          minColumnIndex: 0,
          maxColumnIndex: -1,
          columnCount: 0,
        },
      },
      {
        params: {
          minRowIndex: 2,
          maxRowIndex: 1,
        },
        expectations: {
          minRowIndex: 2,
          maxRowIndex: 1,
          rowCount: 0,
          minColumnIndex: 0,
          maxColumnIndex: -1,
          columnCount: 0,
        },
      },
      {
        params: {
          minRowIndex: 2,
          maxRowIndex: 0,
        },
        expectations: { error: true },
      },
      {
        params: {
          maxColumnIndex: 2,
        },
        expectations: {
          minRowIndex: 0,
          maxRowIndex: -1,
          rowCount: 0,
          minColumnIndex: 0,
          maxColumnIndex: 2,
          columnCount: 3,
        },
      },
      {
        params: {
          minColumnIndex: 2,
          maxColumnIndex: 3,
        },
        expectations: {
          minRowIndex: 0,
          maxRowIndex: -1,
          rowCount: 0,
          minColumnIndex: 2,
          maxColumnIndex: 3,
          columnCount: 2,
        },
      },
      {
        params: {
          minColumnIndex: 2,
          maxColumnIndex: 1,
        },
        expectations: {
          minRowIndex: 0,
          maxRowIndex: -1,
          rowCount: 0,
          minColumnIndex: 2,
          maxColumnIndex: 1,
          columnCount: 0,
        },
      },
      {
        params: {
          minColumnIndex: 2,
          maxColumnIndex: 0,
        },
        expectations: {
          error: true,
        },
      },
      {
        params: {
          maxRowIndex: 5,
          maxColumnIndex: 10,
        },
        expectations: {
          minRowIndex: 0,
          maxRowIndex: 5,
          rowCount: 6,
          minColumnIndex: 0,
          maxColumnIndex: 10,
          columnCount: 11,
        },
      },
      {
        params: {
          minRowIndex: 1,
          maxRowIndex: 5,
          minColumnIndex: 20,
          maxColumnIndex: 30,
        },
        expectations: {
          minRowIndex: 1,
          maxRowIndex: 5,
          rowCount: 5,
          minColumnIndex: 20,
          maxColumnIndex: 30,
          columnCount: 11,
        },
      },
    ];

    constructorTestCases.forEach(({ params, expectations }) => {
      describe(`then constructor params are ${JSON.stringify(params)}`, () => {
        if ('error' in expectations) {
          expect(() => new Matrix(params)).toThrow();

          return;
        }

        const matrix = new Matrix(params);

        const {
          minRowIndex,
          maxRowIndex,
          rowCount,
          minColumnIndex,
          maxColumnIndex,
          columnCount,
        } = expectations;

        it(`sets minRowIndex = ${minRowIndex}`, () => {
          expect(matrix.minRowIndex).toBe(minRowIndex);
        });

        it(`sets maxRowIndex = ${maxRowIndex}`, () => {
          expect(matrix.maxRowIndex).toBe(maxRowIndex);
        });

        it(`sets rowCount = ${rowCount}`, () => {
          expect(matrix.rowCount).toBe(rowCount);
        });

        it(`sets minColumnIndex = ${minColumnIndex}`, () => {
          expect(matrix.minColumnIndex).toBe(minColumnIndex);
        });

        it(`sets maxColumnIndex = ${maxColumnIndex}`, () => {
          expect(matrix.maxColumnIndex).toBe(maxColumnIndex);
        });

        it(`sets columnCount = ${columnCount}`, () => {
          expect(matrix.columnCount).toBe(columnCount);
        });
      });
    });

    describe('when no arguments are passed', () => {
      it('creates empty matrix', () => {
        const matrix = new Matrix();

        expect(matrix.minRowIndex).toEqual(0);
        expect(matrix.maxRowIndex).toEqual(-1);
        expect(matrix.minColumnIndex).toEqual(0);
        expect(matrix.maxColumnIndex).toEqual(-1);

        expect(matrix.columnCount).toEqual(0);
        expect(matrix.rowCount).toEqual(0);
      });
    });
  });

  describe('get/set', () => {
    describe('when cell is within matrix', () => {
      const matrix = new Matrix<string>({
        maxRowIndex: 2,
        maxColumnIndex: 2,
      });

      matrix.set(0, 0, 'a');
      matrix.set(0, 0, 'b');
      matrix.set(0, 1, 'c');

      it('returns element at matrix cell', () => {
        expect(matrix.get(0, 0)).toBe('b');
        expect(matrix.get(0, 1)).toBe('c');
        expect(matrix.get(0, 2)).toBe(undefined);
      });
    });

    describe('when cell is outside of matrix', () => {
      const matrix = new Matrix<string>({
        maxRowIndex: 2,
        maxColumnIndex: 2,
      });

      it('throws error when cell is out of matrix', () => {
        const cellsOutsideMatrix = [
          [-1, 0],
          [3, 0],
          [0, -1],
          [0, 3],
        ];

        cellsOutsideMatrix.forEach(([rowIndex, columnIndex]) => {
          expect(() => matrix.get(rowIndex, columnIndex)).toThrow();
          expect(() => matrix.set(rowIndex, columnIndex, 'a')).toThrow();
        });
      });
    });
  });

  describe('boundary setters', () => {
    const minRowIndex = 0;
    const maxRowIndex = 2;
    const minColumnIndex = 10;
    const maxColumnIndex = 12;

    const matrix = new Matrix<string>({
      minRowIndex,
      maxRowIndex,
      minColumnIndex,
      maxColumnIndex,
    });

    for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex += 1) {
      for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex += 1) {
        matrix.set(rowIndex, columnIndex, `${rowIndex}-${columnIndex}`);
      }
    }

    describe('when list size was decreased and increased back', () => {
      matrix.minRowIndex += 1;
      matrix.minRowIndex -= 1;
      matrix.maxRowIndex -= 1;
      matrix.maxRowIndex += 1;
      matrix.minColumnIndex += 1;
      matrix.minColumnIndex -= 1;
      matrix.maxColumnIndex -= 1;
      matrix.maxColumnIndex += 1;

      it('clears elements that were outside decreased index range', () => {
        for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex += 1) {
          for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex += 1) {
            if (rowIndex === 1 && columnIndex === 11) {
              continue;
            }

            expect(matrix.get(rowIndex, columnIndex)).toBe(undefined);
          }
        }
      });

      it('preserve elements that were within decreased index range', () => {
        expect(matrix.get(1, 11)).toBe('1-11');
      });
    });
  });

  describe('clone', () => {
    let matrix: Matrix<string>;
    let clonedMatrix: Matrix<string>;

    beforeEach(() => {
      matrix = new Matrix<string>({
        maxRowIndex: 1,
        maxColumnIndex: 1,
      });

      matrix.set(0, 0, 'a');
      matrix.set(0, 1, 'b');
      matrix.set(1, 0, 'c');
      matrix.set(1, 1, 'd');

      clonedMatrix = matrix.clone();
    });

    it('creates copy of initial matrix', () => {
      expect(clonedMatrix.minRowIndex).toBe(0);
      expect(clonedMatrix.maxRowIndex).toBe(1);
      expect(clonedMatrix.minColumnIndex).toBe(0);
      expect(clonedMatrix.maxColumnIndex).toBe(1);

      expect(clonedMatrix.get(0, 0)).toBe('a');
      expect(clonedMatrix.get(0, 1)).toBe('b');
      expect(clonedMatrix.get(1, 0)).toBe('c');
      expect(clonedMatrix.get(1, 1)).toBe('d');
    });

    describe('when cloned matrix is changed', () => {
      beforeEach(() => {
        clonedMatrix.maxRowIndex = 0;
        clonedMatrix.maxColumnIndex = 0;

        clonedMatrix.set(0, 0, 'e');
      });

      it('updates cloned matrix', () => {
        expect(clonedMatrix.minRowIndex).toBe(0);
        expect(clonedMatrix.maxRowIndex).toBe(0);
        expect(clonedMatrix.minColumnIndex).toBe(0);
        expect(clonedMatrix.maxColumnIndex).toBe(0);

        expect(clonedMatrix.get(0, 0)).toBe('e');
      });

      it("doesn't update initial matrix", () => {
        expect(matrix.minRowIndex).toBe(0);
        expect(matrix.maxRowIndex).toBe(1);
        expect(matrix.minColumnIndex).toBe(0);
        expect(matrix.maxColumnIndex).toBe(1);

        expect(matrix.get(0, 0)).toBe('a');
        expect(matrix.get(0, 1)).toBe('b');
        expect(matrix.get(1, 0)).toBe('c');
        expect(matrix.get(1, 1)).toBe('d');
      });
    });
  });

  describe('mappers', () => {
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
        const x = matrix.mapRows((row) => (
          `#${row.index} ${row.mapColumns((cell) => `[${cell.rowIndex}:${cell.columnIndex}]`).join(',')}`
        ));

        expect(x).toEqual([
          '#0 [0:100],[0:101]',
          '#1 [1:100],[1:101]',
        ]);
      });
    });

    describe('mapColumns', () => {
      it('return array of results of calls of callback for each matrix column', () => {
        const x = matrix.mapColumns((column) => (
          `#${column.index} ${column.mapRows((cell) => `[${cell.rowIndex}:${cell.columnIndex}]`).join(',')}`
        ));

        expect(x).toEqual([
          '#100 [0:100],[1:100]',
          '#101 [0:101],[1:101]',
        ]);
      });
    });
  });

  describe('increaseMatrixSizeToIncludeCell', () => {
    interface TestCase {
      initialMatrixSizes: MatrixSizes;
      cell: Cell;
      options?: { borderOffset?: number };
      expectedNewMatrixSize: MatrixSizes | 'no changes';
    }

    const testCases: TestCase[] = [
      // ===========================================
      // single-cell, offset = 0
      // ===========================================
      {
        initialMatrixSizes: {
          minRowIndex: 0, maxRowIndex: 0, minColumnIndex: 0, maxColumnIndex: 0,
        },
        cell: { rowIndex: 0, columnIndex: 0 },
        expectedNewMatrixSize: 'no changes',
      },

      // ===========================================
      // single-cell, offset = 1
      // ===========================================
      {
        initialMatrixSizes: {
          minRowIndex: 0, maxRowIndex: 0, minColumnIndex: 0, maxColumnIndex: 0,
        },
        cell: { rowIndex: 0, columnIndex: 0 },
        options: { borderOffset: 1 },
        expectedNewMatrixSize: {
          minRowIndex: -1, maxRowIndex: 1, minColumnIndex: -1, maxColumnIndex: 1,
        },
      },

      // ===========================================
      // single-cell, offset = 2
      // ===========================================
      {
        initialMatrixSizes: {
          minRowIndex: 0, maxRowIndex: 0, minColumnIndex: 0, maxColumnIndex: 0,
        },
        cell: { rowIndex: 0, columnIndex: 0 },
        options: { borderOffset: 2 },
        expectedNewMatrixSize: {
          minRowIndex: -2, maxRowIndex: 2, minColumnIndex: -2, maxColumnIndex: 2,
        },
      },

      // ===========================================
      // inner cell, offset = 0
      // ===========================================
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 6, columnIndex: 11 },
        expectedNewMatrixSize: 'no changes',
      },

      // ===========================================
      // inner cell, offset = 1
      // ===========================================
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 6, columnIndex: 11 },
        options: { borderOffset: 1 },
        expectedNewMatrixSize: 'no changes',
      },

      // ===========================================
      // inner cell, offset = 2
      // ===========================================
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 6, columnIndex: 11 },
        options: { borderOffset: 2 },
        expectedNewMatrixSize: {
          minRowIndex: 4, maxRowIndex: 15, minColumnIndex: 9, maxColumnIndex: 20,
        },
      },

      // ===========================================
      // inner cell, offset = 2
      // ===========================================
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 6, columnIndex: 11 },
        options: { borderOffset: 1 },
        expectedNewMatrixSize: 'no changes',
      },

      // ===========================================
      // border cell, offset = 1
      // ===========================================
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 5, columnIndex: 10 },
        options: { borderOffset: 1 },
        expectedNewMatrixSize: {
          minRowIndex: 4, maxRowIndex: 15, minColumnIndex: 9, maxColumnIndex: 20,
        },
      },
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 5, columnIndex: 15 },
        options: { borderOffset: 1 },
        expectedNewMatrixSize: {
          minRowIndex: 4, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
      },
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 5, columnIndex: 20 },
        options: { borderOffset: 1 },
        expectedNewMatrixSize: {
          minRowIndex: 4, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 21,
        },
      },
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 10, columnIndex: 20 },
        options: { borderOffset: 1 },
        expectedNewMatrixSize: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 21,
        },
      },
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 15, columnIndex: 20 },
        options: { borderOffset: 1 },
        expectedNewMatrixSize: {
          minRowIndex: 5, maxRowIndex: 16, minColumnIndex: 10, maxColumnIndex: 21,
        },
      },
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 15, columnIndex: 15 },
        options: { borderOffset: 1 },
        expectedNewMatrixSize: {
          minRowIndex: 5, maxRowIndex: 16, minColumnIndex: 10, maxColumnIndex: 20,
        },
      },
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 15, columnIndex: 10 },
        options: { borderOffset: 1 },
        expectedNewMatrixSize: {
          minRowIndex: 5, maxRowIndex: 16, minColumnIndex: 9, maxColumnIndex: 20,
        },
      },
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 10, columnIndex: 10 },
        options: { borderOffset: 1 },
        expectedNewMatrixSize: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 9, maxColumnIndex: 20,
        },
      },

      // ===========================================
      // border cell, offset = 2
      // ===========================================
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 5, columnIndex: 10 },
        options: { borderOffset: 2 },
        expectedNewMatrixSize: {
          minRowIndex: 3, maxRowIndex: 15, minColumnIndex: 8, maxColumnIndex: 20,
        },
      },
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 5, columnIndex: 15 },
        options: { borderOffset: 2 },
        expectedNewMatrixSize: {
          minRowIndex: 3, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
      },
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 5, columnIndex: 20 },
        options: { borderOffset: 2 },
        expectedNewMatrixSize: {
          minRowIndex: 3, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 22,
        },
      },
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 10, columnIndex: 20 },
        options: { borderOffset: 2 },
        expectedNewMatrixSize: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 22,
        },
      },
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 15, columnIndex: 20 },
        options: { borderOffset: 2 },
        expectedNewMatrixSize: {
          minRowIndex: 5, maxRowIndex: 17, minColumnIndex: 10, maxColumnIndex: 22,
        },
      },
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 15, columnIndex: 15 },
        options: { borderOffset: 2 },
        expectedNewMatrixSize: {
          minRowIndex: 5, maxRowIndex: 17, minColumnIndex: 10, maxColumnIndex: 20,
        },
      },
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 15, columnIndex: 10 },
        options: { borderOffset: 2 },
        expectedNewMatrixSize: {
          minRowIndex: 5, maxRowIndex: 17, minColumnIndex: 8, maxColumnIndex: 20,
        },
      },
      {
        initialMatrixSizes: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 10, maxColumnIndex: 20,
        },
        cell: { rowIndex: 10, columnIndex: 10 },
        options: { borderOffset: 2 },
        expectedNewMatrixSize: {
          minRowIndex: 5, maxRowIndex: 15, minColumnIndex: 8, maxColumnIndex: 20,
        },
      },
    ];

    testCases.forEach(({
      initialMatrixSizes, cell, options, expectedNewMatrixSize,
    }) => {
      describe(`then initial matrix sizes are ${JSON.stringify(initialMatrixSizes)}, cell is ${JSON.stringify(cell)} and options are ${JSON.stringify(options)}`, () => {
        const matrix = new Matrix(initialMatrixSizes);

        matrix.increaseMatrixSizeToIncludeCell(cell, options);

        it(`sets new matrix sizes to ${JSON.stringify(expectedNewMatrixSize)}`, () => {
          const {
            minRowIndex,
            maxRowIndex,
            minColumnIndex,
            maxColumnIndex,
          } = matrix;

          expect({
            minRowIndex,
            maxRowIndex,
            minColumnIndex,
            maxColumnIndex,
          }).toEqual(expectedNewMatrixSize === 'no changes' ? initialMatrixSizes : expectedNewMatrixSize);
        });
      });
    });
  });

  describe('getCentralCell', () => {
    describe('when there is a cell that is placed in exact center', () => {
      const matrix = new Matrix({
        minRowIndex: 1,
        maxRowIndex: 5,
        minColumnIndex: -1,
        maxColumnIndex: 5,
      });

      it('returns central cell', () => {
        expect(matrix.getCentralCell()).toEqual({ rowIndex: 3, columnIndex: 2 });
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
        expect(matrix.getCentralCell()).toEqual({ rowIndex: 2, columnIndex: 1 });
      });
    });
  });
});
