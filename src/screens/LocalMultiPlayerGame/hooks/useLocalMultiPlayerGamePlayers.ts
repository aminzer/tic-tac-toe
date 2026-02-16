import { useMemo } from 'react';
import { Mark } from '@app/constants';
import { LocalHumanPlayer, Player } from '@app/services/player';

const useLocalMultiPlayerGamePlayers = (): Player[] => {
  return useMemo(() => {
    return [
      new LocalHumanPlayer({ mark: Mark.CROSS }),
      new LocalHumanPlayer({ mark: Mark.NOUGHT }),
    ];
  }, []);
};

export default useLocalMultiPlayerGamePlayers;
