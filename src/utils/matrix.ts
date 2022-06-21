import { List } from '../data_structures';
import { Cell } from '../types';

const addRowFromStart = <T,>(matrix: List<List<T>>): void => {
  matrix.pushFromStart(new List<T>({
    minIndex: matrix.get(0).minIndex,
    maxIndex: matrix.get(0).maxIndex,
  }));
};

const addRowToEnd = <T,>(matrix: List<List<T>>): void => {
  matrix.push(new List<T>({
    minIndex: matrix.get(0).minIndex,
    maxIndex: matrix.get(0).maxIndex,
  }));
};

const addColumnFromStart = <T,>(matrix: List<List<T>>): void => {
  matrix.forEach(row => {
    row.pushFromStart(undefined as unknown as T);
  });
};

const addColumnToEnd = <T,>(matrix: List<List<T>>): void => {
  matrix.forEach(row => {
    row.push(undefined as unknown as T);
  });
};

export const increaseMatrixSizeBeyondBoundaryCell = <T,>(matrix: List<List<T>>, cell: Cell): void => {
  if (cell.rowIndex === matrix.minIndex) {
    addRowFromStart(matrix);
  }

  if (cell.rowIndex === matrix.maxIndex) {
    addRowToEnd(matrix);
  }

  if (cell.columnIndex === matrix.get(0).minIndex) {
    addColumnFromStart(matrix);
  }

  if (cell.columnIndex === matrix.get(0).maxIndex) {
    addColumnToEnd(matrix);
  }
};

export const createMatrix = <T,>({
  minRowIndex = 0,
  maxRowIndex,
  minColumnIndex = 0,
  maxColumnIndex,
}: {
  minRowIndex?: number;
  maxRowIndex: number;
  minColumnIndex?: number;
  maxColumnIndex: number;
}): List<List<T>> => {
  const matrix = new List<List<T>>({
    minIndex: minRowIndex,
    maxIndex: maxRowIndex,
  });

  for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex++) {
    const row = new List<T>({
      minIndex: minColumnIndex,
      maxIndex: maxColumnIndex,
    });

    matrix.set(rowIndex, row);
  }

  return matrix;
};

export const cloneMatrix = <T,>(matrix: List<List<T>>): List<List<T>> => {
  const newMatrix = createMatrix<T>({
    minRowIndex: matrix.minIndex,
    maxRowIndex: matrix.maxIndex,
    minColumnIndex: matrix.get(0).minIndex,
    maxColumnIndex: matrix.get(0).maxIndex,
  });

  matrix.forEach((row, rowIndex)=> {
    row.forEach((cell, cellIndex) => {
      newMatrix.get(rowIndex).set(cellIndex, cell);
    });
  });

  return newMatrix;
};
