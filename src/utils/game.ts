import { Mark, GameRoundStatus } from '../constants';
import { GameRoundInfo } from '../types';

export const isGameRoundFinished = (gameRoundInfo: GameRoundInfo): boolean => {
  return gameRoundInfo.status === GameRoundStatus.FINISHED;
};

export const invertMark = (mark: Mark): Mark => {
  return mark === Mark.NOUGHT ? Mark.CROSS : Mark.NOUGHT;
};
