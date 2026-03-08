import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import invertMark from '@app/services/game/invertMark';
import { Cell } from '@app/types';
import {
  DIRECTIONS,
  OFFENSE_WEIGHT,
  SCORE_TABLE,
  WIN_SCORE,
  WIN_SEQUENCE_LENGTH,
} from './constants';
import countConsecutive from './countConsecutive';
import countUnblockedCells from './countUnblockedCells';

const getDirectionScore = (
  markMatrix: Matrix<Mark>,
  cell: Cell,
  rowDelta: number,
  columnDelta: number,
  targetMark: Mark,
): number => {
  const { rowIndex, columnIndex } = cell;
  const opponentMark = invertMark(targetMark);

  const forward = countConsecutive({
    markMatrix,
    startRowIndex: rowIndex,
    startColumnIndex: columnIndex,
    rowDelta,
    columnDelta,
    targetMark,
  });
  const backward = countConsecutive({
    markMatrix,
    startRowIndex: rowIndex,
    startColumnIndex: columnIndex,
    rowDelta: -rowDelta,
    columnDelta: -columnDelta,
    targetMark,
  });
  const sequenceLength = 1 + forward + backward;

  if (sequenceLength >= WIN_SEQUENCE_LENGTH) {
    return WIN_SCORE;
  }

  const forwardOpen = countUnblockedCells({
    markMatrix,
    startRowIndex: rowIndex + rowDelta * forward,
    startColumnIndex: columnIndex + columnDelta * forward,
    rowDelta,
    columnDelta,
    opponentMark,
    maxCount: WIN_SEQUENCE_LENGTH,
  });
  const backwardOpen = countUnblockedCells({
    markMatrix,
    startRowIndex: rowIndex - rowDelta * backward,
    startColumnIndex: columnIndex - columnDelta * backward,
    rowDelta: -rowDelta,
    columnDelta: -columnDelta,
    opponentMark,
    maxCount: WIN_SEQUENCE_LENGTH,
  });
  const totalOpenSpace = sequenceLength + forwardOpen + backwardOpen;

  if (totalOpenSpace < WIN_SEQUENCE_LENGTH) {
    return 0;
  }

  return SCORE_TABLE[sequenceLength] ?? WIN_SCORE;
};

const evaluateCell = (markMatrix: Matrix<Mark>, cell: Cell, botMark: Mark): number => {
  const opponentMark = invertMark(botMark);

  const offensiveScore = DIRECTIONS.reduce(
    (sum, { rowDelta, columnDelta }) =>
      sum + getDirectionScore(markMatrix, cell, rowDelta, columnDelta, botMark),
    0,
  );

  const defensiveScore = DIRECTIONS.reduce(
    (sum, { rowDelta, columnDelta }) =>
      sum + getDirectionScore(markMatrix, cell, rowDelta, columnDelta, opponentMark),
    0,
  );

  return offensiveScore * OFFENSE_WEIGHT + defensiveScore;
};

export default evaluateCell;
