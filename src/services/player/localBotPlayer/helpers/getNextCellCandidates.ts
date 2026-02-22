import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import { Cell } from '@app/types';
import { NEIGHBOR_CELLS_OFFSETS } from './constants';
import safeGet from './safeGet';

const getNextCellCandidates = (markMatrix: Matrix<Mark>): Cell[] => {
  const { minRowIndex, maxRowIndex, minColumnIndex, maxColumnIndex } = markMatrix;

  const nextCellCandidates = new Map<string, Cell>();
  let isThereAtLeastOneMarkedCellInMatrix = false;

  for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex += 1) {
    for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex += 1) {
      const mark = markMatrix.get(rowIndex, columnIndex);

      if (!mark) {
        continue;
      }

      isThereAtLeastOneMarkedCellInMatrix = true;

      NEIGHBOR_CELLS_OFFSETS.forEach(({ rowDelta, columnDelta }) => {
        const nextCellCandidateRowIndex = rowIndex + rowDelta;
        const nextCellCandidateColumnIndex = columnIndex + columnDelta;
        const nextCellCandidateUniqueId = `${nextCellCandidateRowIndex}_${nextCellCandidateColumnIndex}`;

        if (nextCellCandidates.has(nextCellCandidateUniqueId)) {
          return;
        }

        if (safeGet(markMatrix, nextCellCandidateRowIndex, nextCellCandidateColumnIndex)) {
          return;
        }

        nextCellCandidates.set(nextCellCandidateUniqueId, {
          rowIndex: nextCellCandidateRowIndex,
          columnIndex: nextCellCandidateColumnIndex,
        });
      });
    }
  }

  if (!isThereAtLeastOneMarkedCellInMatrix) {
    return [markMatrix.getCentralCell()];
  }

  return [...nextCellCandidates.values()];
};

export default getNextCellCandidates;
