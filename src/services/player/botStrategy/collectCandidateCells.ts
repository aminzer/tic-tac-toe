import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import { Cell } from '@app/types';
import safeGet from './safeGet';

const NEIGHBOR_OFFSETS: [number, number][] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const collectCandidateCells = (markMatrix: Matrix<Mark>): Cell[] => {
  const { minRowIndex, maxRowIndex, minColumnIndex, maxColumnIndex } = markMatrix;
  const candidates = new Map<string, Cell>();
  let hasOccupiedCell = false;

  for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex += 1) {
    for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex += 1) {
      const mark = markMatrix.get(rowIndex, columnIndex);

      if (!mark) {
        continue;
      }

      hasOccupiedCell = true;

      NEIGHBOR_OFFSETS.forEach(([deltaRow, deltaColumn]) => {
        const candidateRowIndex = rowIndex + deltaRow;
        const candidateColumnIndex = columnIndex + deltaColumn;
        const key = `${candidateRowIndex}_${candidateColumnIndex}`;

        if (candidates.has(key)) {
          return;
        }

        if (safeGet(markMatrix, candidateRowIndex, candidateColumnIndex)) {
          return;
        }

        candidates.set(key, { rowIndex: candidateRowIndex, columnIndex: candidateColumnIndex });
      });
    }
  }

  if (!hasOccupiedCell) {
    return [markMatrix.getCentralCell()];
  }

  return [...candidates.values()];
};

export default collectCandidateCells;
