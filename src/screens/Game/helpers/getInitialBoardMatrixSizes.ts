import { getValueWithinLimits } from '@app/utils/math';

const getInitialBoardMatrixSizes = ({
  viewportDimensions,
  boardCellSizePx,
}: {
  viewportDimensions: { width: number; height: number };
  boardCellSizePx: number;
}): {
  maxRowIndex: number;
  maxColumnIndex: number;
} => {
  const cellCountToFitInRow = Math.floor(viewportDimensions.height / boardCellSizePx) - 5;
  const cellCountToFitInColumn = Math.floor(viewportDimensions.width / boardCellSizePx) - 2;

  const maxRowIndex = getValueWithinLimits(cellCountToFitInRow, {
    lowerLimit: 2,
    upperLimit: 10,
  });

  const maxColumnIndex = getValueWithinLimits(cellCountToFitInColumn, {
    lowerLimit: 2,
    upperLimit: 10,
  });

  return {
    maxRowIndex,
    maxColumnIndex,
  };
};

export default getInitialBoardMatrixSizes;
