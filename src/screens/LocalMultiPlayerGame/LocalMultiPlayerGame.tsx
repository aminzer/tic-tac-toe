import Game from '@app/components/Game';
import { useLocalMultiPlayerGamePlayers } from './hooks';

const LocalMultiPlayerGame: React.FC = () => {
  const players = useLocalMultiPlayerGamePlayers();

  return <Game players={players} />;
};

export default LocalMultiPlayerGame;
