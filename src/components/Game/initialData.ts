import { GameRoundStatus, Mark } from '@app/constants';
import { GameRoundInfo, GameStatistic } from '@app/types';

export const initialMark: Mark = Mark.CROSS;

export const initialGameRoundInfo: GameRoundInfo = {
  startingMark: initialMark,
  status: GameRoundStatus.NOT_STARTED,
};

export const initialGameStatistic: GameStatistic = {
  winCount: {
    [Mark.CROSS]: 0,
    [Mark.NOUGHT]: 0,
  },
};
