import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import { Cell } from '@app/types';
import evaluateCell from './evaluateCell';
import getNextCellCandidates from './getNextCellCandidates';

const getBestCell = (markMatrix: Matrix<Mark>, botMark: Mark): Cell => {
  const nextCellCandidates = getNextCellCandidates(markMatrix);

  const nextCellCandidateScores = nextCellCandidates.map((nextCellCandidate) =>
    evaluateCell(markMatrix, nextCellCandidate, botMark),
  );

  const maxNextCellCandidateScoreIndex = nextCellCandidateScores.reduce(
    (maxIndex, score, index) => (score > nextCellCandidateScores[maxIndex] ? index : maxIndex),
    0,
  );

  return nextCellCandidates[maxNextCellCandidateScoreIndex];
};

export default getBestCell;
