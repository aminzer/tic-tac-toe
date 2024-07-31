import { formatTestName } from '@aminzer/describe-function-test';
import { Cell, MatrixSizes } from '@app/types';
import Matrix from '../Matrix';

describe(formatTestName(__filename), () => {
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
        minRowIndex: 0,
        maxRowIndex: 0,
        minColumnIndex: 0,
        maxColumnIndex: 0,
      },
      cell: { rowIndex: 0, columnIndex: 0 },
      expectedNewMatrixSize: 'no changes',
    },

    // ===========================================
    // single-cell, offset = 1
    // ===========================================
    {
      initialMatrixSizes: {
        minRowIndex: 0,
        maxRowIndex: 0,
        minColumnIndex: 0,
        maxColumnIndex: 0,
      },
      cell: { rowIndex: 0, columnIndex: 0 },
      options: { borderOffset: 1 },
      expectedNewMatrixSize: {
        minRowIndex: -1,
        maxRowIndex: 1,
        minColumnIndex: -1,
        maxColumnIndex: 1,
      },
    },

    // ===========================================
    // single-cell, offset = 2
    // ===========================================
    {
      initialMatrixSizes: {
        minRowIndex: 0,
        maxRowIndex: 0,
        minColumnIndex: 0,
        maxColumnIndex: 0,
      },
      cell: { rowIndex: 0, columnIndex: 0 },
      options: { borderOffset: 2 },
      expectedNewMatrixSize: {
        minRowIndex: -2,
        maxRowIndex: 2,
        minColumnIndex: -2,
        maxColumnIndex: 2,
      },
    },

    // ===========================================
    // inner cell, offset = 0
    // ===========================================
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 6, columnIndex: 11 },
      expectedNewMatrixSize: 'no changes',
    },

    // ===========================================
    // inner cell, offset = 1
    // ===========================================
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
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
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 6, columnIndex: 11 },
      options: { borderOffset: 2 },
      expectedNewMatrixSize: {
        minRowIndex: 4,
        maxRowIndex: 15,
        minColumnIndex: 9,
        maxColumnIndex: 20,
      },
    },

    // ===========================================
    // inner cell, offset = 2
    // ===========================================
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
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
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 5, columnIndex: 10 },
      options: { borderOffset: 1 },
      expectedNewMatrixSize: {
        minRowIndex: 4,
        maxRowIndex: 15,
        minColumnIndex: 9,
        maxColumnIndex: 20,
      },
    },
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 5, columnIndex: 15 },
      options: { borderOffset: 1 },
      expectedNewMatrixSize: {
        minRowIndex: 4,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
    },
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 5, columnIndex: 20 },
      options: { borderOffset: 1 },
      expectedNewMatrixSize: {
        minRowIndex: 4,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 21,
      },
    },
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 10, columnIndex: 20 },
      options: { borderOffset: 1 },
      expectedNewMatrixSize: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 21,
      },
    },
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 15, columnIndex: 20 },
      options: { borderOffset: 1 },
      expectedNewMatrixSize: {
        minRowIndex: 5,
        maxRowIndex: 16,
        minColumnIndex: 10,
        maxColumnIndex: 21,
      },
    },
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 15, columnIndex: 15 },
      options: { borderOffset: 1 },
      expectedNewMatrixSize: {
        minRowIndex: 5,
        maxRowIndex: 16,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
    },
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 15, columnIndex: 10 },
      options: { borderOffset: 1 },
      expectedNewMatrixSize: {
        minRowIndex: 5,
        maxRowIndex: 16,
        minColumnIndex: 9,
        maxColumnIndex: 20,
      },
    },
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 10, columnIndex: 10 },
      options: { borderOffset: 1 },
      expectedNewMatrixSize: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 9,
        maxColumnIndex: 20,
      },
    },

    // ===========================================
    // border cell, offset = 2
    // ===========================================
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 5, columnIndex: 10 },
      options: { borderOffset: 2 },
      expectedNewMatrixSize: {
        minRowIndex: 3,
        maxRowIndex: 15,
        minColumnIndex: 8,
        maxColumnIndex: 20,
      },
    },
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 5, columnIndex: 15 },
      options: { borderOffset: 2 },
      expectedNewMatrixSize: {
        minRowIndex: 3,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
    },
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 5, columnIndex: 20 },
      options: { borderOffset: 2 },
      expectedNewMatrixSize: {
        minRowIndex: 3,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 22,
      },
    },
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 10, columnIndex: 20 },
      options: { borderOffset: 2 },
      expectedNewMatrixSize: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 22,
      },
    },
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 15, columnIndex: 20 },
      options: { borderOffset: 2 },
      expectedNewMatrixSize: {
        minRowIndex: 5,
        maxRowIndex: 17,
        minColumnIndex: 10,
        maxColumnIndex: 22,
      },
    },
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 15, columnIndex: 15 },
      options: { borderOffset: 2 },
      expectedNewMatrixSize: {
        minRowIndex: 5,
        maxRowIndex: 17,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
    },
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 15, columnIndex: 10 },
      options: { borderOffset: 2 },
      expectedNewMatrixSize: {
        minRowIndex: 5,
        maxRowIndex: 17,
        minColumnIndex: 8,
        maxColumnIndex: 20,
      },
    },
    {
      initialMatrixSizes: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 10,
        maxColumnIndex: 20,
      },
      cell: { rowIndex: 10, columnIndex: 10 },
      options: { borderOffset: 2 },
      expectedNewMatrixSize: {
        minRowIndex: 5,
        maxRowIndex: 15,
        minColumnIndex: 8,
        maxColumnIndex: 20,
      },
    },
  ];

  testCases.forEach(({ initialMatrixSizes, cell, options, expectedNewMatrixSize }) => {
    describe(`then initial matrix sizes are ${JSON.stringify(
      initialMatrixSizes,
    )}, cell is ${JSON.stringify(cell)} and options are ${JSON.stringify(options)}`, () => {
      const matrix = new Matrix(initialMatrixSizes);

      matrix.increaseMatrixSizeToIncludeCell(cell, options);

      it(`sets new matrix sizes to ${JSON.stringify(expectedNewMatrixSize)}`, () => {
        const { minRowIndex, maxRowIndex, minColumnIndex, maxColumnIndex } = matrix;

        expect({
          minRowIndex,
          maxRowIndex,
          minColumnIndex,
          maxColumnIndex,
        }).toEqual(
          expectedNewMatrixSize === 'no changes' ? initialMatrixSizes : expectedNewMatrixSize,
        );
      });
    });
  });
});
