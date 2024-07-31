import { GameRoundStatus } from '@app/constants';
import { GameRoundInfo } from '@app/types';

const isGameRoundFinished = (gameRoundInfo: Pick<GameRoundInfo, 'status'>): boolean => {
  return gameRoundInfo.status === GameRoundStatus.FINISHED;
};

export default isGameRoundFinished;
