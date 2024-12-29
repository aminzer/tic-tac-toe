import { Mark } from '@app/constants';
import { Player } from '../player';

const findCurrentPlayer = (players: Player[], currentMark: Mark): Player | undefined => {
  return players.find((player) => player.getMark() === currentMark);
};

export default findCurrentPlayer;
