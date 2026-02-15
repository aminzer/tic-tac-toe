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
import countOpenSpace from './countOpenSpace';

const getDirectionScore = (
  markMatrix: Matrix<Mark>,
  cell: Cell,
  deltaRow: number,
  deltaColumn: number,
  targetMark: Mark,
): number => {
  const { rowIndex, columnIndex } = cell;
  const opponentMark = invertMark(targetMark);

  const forward = countConsecutive(
    markMatrix,
    rowIndex,
    columnIndex,
    deltaRow,
    deltaColumn,
    targetMark,
  );
  const backward = countConsecutive(
    markMatrix,
    rowIndex,
    columnIndex,
    -deltaRow,
    -deltaColumn,
    targetMark,
  );
  const sequenceLength = 1 + forward + backward;

  if (sequenceLength >= WIN_SEQUENCE_LENGTH) {
    return WIN_SCORE;
  }

  const forwardOpen = countOpenSpace(
    markMatrix,
    rowIndex + deltaRow * forward,
    columnIndex + deltaColumn * forward,
    deltaRow,
    deltaColumn,
    opponentMark,
    WIN_SEQUENCE_LENGTH,
  );
  const backwardOpen = countOpenSpace(
    markMatrix,
    rowIndex - deltaRow * backward,
    columnIndex - deltaColumn * backward,
    -deltaRow,
    -deltaColumn,
    opponentMark,
    WIN_SEQUENCE_LENGTH,
  );
  const totalOpenSpace = sequenceLength + forwardOpen + backwardOpen;

  if (totalOpenSpace < WIN_SEQUENCE_LENGTH) {
    return 0;
  }

  return SCORE_TABLE[sequenceLength] ?? WIN_SCORE;
};

const evaluateCell = (markMatrix: Matrix<Mark>, cell: Cell, botMark: Mark): number => {
  const opponentMark = invertMark(botMark);

  const offensiveScore = DIRECTIONS.reduce(
    (sum, [deltaRow, deltaColumn]) =>
      sum + getDirectionScore(markMatrix, cell, deltaRow, deltaColumn, botMark),
    0,
  );
  const defensiveScore = DIRECTIONS.reduce(
    (sum, [deltaRow, deltaColumn]) =>
      sum + getDirectionScore(markMatrix, cell, deltaRow, deltaColumn, opponentMark),
    0,
  );

  return offensiveScore * OFFENSE_WEIGHT + defensiveScore;
};

export default evaluateCell;
