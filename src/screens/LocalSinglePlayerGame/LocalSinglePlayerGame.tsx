import Game from '@app/components/Game';
import { useLocalSinglePlayerGamePlayers } from './hooks';

const LocalSinglePlayerGame: React.FC = () => {
  const players = useLocalSinglePlayerGamePlayers();

  return <Game players={players} />;
};

export default LocalSinglePlayerGame;
