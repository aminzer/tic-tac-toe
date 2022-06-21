import { Mark, GameRoundStatus } from '../constants';
import { MarkMatrix, GameRoundInfo, GameStatistic } from '../types';
import { createMatrix } from '../utils';

export const initialMark: Mark = Mark.CROSS;

export const initialMarkMatrix: MarkMatrix = createMatrix<Mark>({
  maxRowIndex: 10,
  maxColumnIndex: 10,
});

export const initialGameRoundInfo: GameRoundInfo = {
  startingMark: initialMark,
  status: GameRoundStatus.IN_PROGRESS,
};

export const initialGameStatistic: GameStatistic = {
  winCount: {
    [Mark.CROSS]: 0,
    [Mark.NOUGHT]: 0,
  }
};
