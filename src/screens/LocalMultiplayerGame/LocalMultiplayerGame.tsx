import Game from '@app/components/Game';
import { useLocalMultiplayerGamePlayers } from './hooks';

const LocalMultiplayerGame: React.FC = () => {
  const players = useLocalMultiplayerGamePlayers();

  return <Game players={players} />;
};

export default LocalMultiplayerGame;
