import { useMemo } from 'react';
import { Mark } from '@app/constants';
import { LocalBotPlayer, LocalHumanPlayer, Player } from '@app/services/player';

const useLocalSinglePlayerGamePlayers = (): Player[] => {
  return useMemo(() => {
    return [new LocalHumanPlayer({ mark: Mark.CROSS }), new LocalBotPlayer({ mark: Mark.NOUGHT })];
  }, []);
};

export default useLocalSinglePlayerGamePlayers;
