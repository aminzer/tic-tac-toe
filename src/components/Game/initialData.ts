import { GameRoundStatus, Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import { GameRoundInfo, GameStatistic } from '@app/types';

export const initialMark: Mark = Mark.CROSS;

export const initialMarkMatrix = new Matrix<Mark>({
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
  },
};
