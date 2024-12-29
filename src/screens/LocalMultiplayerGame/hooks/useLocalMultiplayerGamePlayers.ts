import { useMemo } from 'react';
import { Mark } from '@app/constants';
import { LocalHumanPlayer, Player } from '@app/services/player';

const useLocalMultiplayerGamePlayers = (): Player[] => {
  return useMemo(() => {
    return [
      new LocalHumanPlayer({ mark: Mark.CROSS }),
      new LocalHumanPlayer({ mark: Mark.NOUGHT }),
    ];
  }, []);
};

export default useLocalMultiplayerGamePlayers;
