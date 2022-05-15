import { List } from '../data_structures';
import { Cell } from '../interfaces';

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

export const increaseSizeBeyondBoundaryCell = <T,>(matrix: List<List<T>>, cell: Cell): void => {
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

export const createMatrix = <T,>({ rowCount, columnCount }: { rowCount: number, columnCount: number }): List<List<T>> => {
  const matrix = new List<List<T>>({ maxIndex: rowCount - 1 });

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    const row = new List<T>({ maxIndex: columnCount - 1 });

    matrix.set(rowIndex, row);
  }

  return matrix;
};
