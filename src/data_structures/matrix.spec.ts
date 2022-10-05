import { Matrix } from './matrix';

interface ConstructorTestCase {
  params?: {
    minRowIndex?: number;
    maxRowIndex?: number;
    minColumnIndex?: number;
    maxColumnIndex?: number;
  };
  expectations: {
    minRowIndex: number;
    maxRowIndex: number;
    rowCount: number;
    minColumnIndex: number;
    maxColumnIndex: number;
    columnCount: number;
  } | {
    error: true;
  };
}

describe('Matrix', () => {
  describe('constructor', () => {
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

    for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex++) {
      for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex++) {
        matrix.set(rowIndex, columnIndex, `${rowIndex}-${columnIndex}`);
      }
    }

    describe('when list size was decreased and increased back', () => {
      matrix.minRowIndex++;
      matrix.minRowIndex--;
      matrix.maxRowIndex--;
      matrix.maxRowIndex++;
      matrix.minColumnIndex++;
      matrix.minColumnIndex--;
      matrix.maxColumnIndex--;
      matrix.maxColumnIndex++;

      it('clears elements that were outside decreased index range', () => {
        for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex++) {
          for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex++) {
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
        const x = matrix.mapRows(row => (
          `#${row.index} ${row.mapColumns((cell) => `[${cell.rowIndex}:${cell.columnIndex}]`).join(',')}`
        ))

        expect(x).toEqual([
          '#0 [0:100],[0:101]',
          '#1 [1:100],[1:101]',
        ])
      });
    });

    describe('mapColumns', () => {
      it('return array of results of calls of callback for each matrix column', () => {
        const x = matrix.mapColumns(column => (
          `#${column.index} ${column.mapRows((cell) => `[${cell.rowIndex}:${cell.columnIndex}]`).join(',')}`
        ))

        expect(x).toEqual([
          '#100 [0:100],[1:100]',
          '#101 [0:101],[1:101]',
        ])
      });
    });
  });
});
