import { GameRoundStatus } from '../../constants';
import { GameRoundInfo } from '../../types';

const isGameRoundFinished = (gameRoundInfo: Pick<GameRoundInfo, 'status'>): boolean => {
  return gameRoundInfo.status === GameRoundStatus.FINISHED;
};

export default isGameRoundFinished;
