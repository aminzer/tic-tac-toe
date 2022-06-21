import { Mark, GameRoundStatus } from '../constants';
import { GameRoundInfo } from '../types';

export function isGameRoundFinished(gameRoundInfo: GameRoundInfo): boolean {
  return gameRoundInfo.status === GameRoundStatus.FINISHED;
}

export function invertMark(mark: Mark): Mark {
  return mark === Mark.NOUGHT ? Mark.CROSS : Mark.NOUGHT;
}
