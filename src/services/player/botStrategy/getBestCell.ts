import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import { Cell } from '@app/types';
import collectCandidateCells from './collectCandidateCells';
import evaluateCell from './evaluateCell';

const getBestCell = (markMatrix: Matrix<Mark>, botMark: Mark): Cell => {
  const candidates = collectCandidateCells(markMatrix);
  const scores = candidates.map((cell) => evaluateCell(markMatrix, cell, botMark));

  const bestCandidateIndex = scores.reduce(
    (maxIdx, score, idx) => (score > scores[maxIdx] ? idx : maxIdx),
    0,
  );

  return candidates[bestCandidateIndex];
};

export default getBestCell;
