import { MatrixSizes } from '../../types';
import Matrix from '../Matrix';

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
});
