import { GameRoundStatus } from '../../constants';
import { GameRoundInfo } from '../../types';

const isGameRoundFinished = (gameRoundInfo: GameRoundInfo): boolean => {
  return gameRoundInfo.status === GameRoundStatus.FINISHED;
};

export default isGameRoundFinished;
