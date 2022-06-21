import { Mark } from '../../constants';
import { GameRoundInfo, GameStatistic } from '../../types';
import Statistic from './statistic';
import RoundInfo from './round_info';
import './header.styles.css';

interface Props {
  currentMark: Mark;
  gameRoundInfo: GameRoundInfo;
  gameStatistic: GameStatistic;
  onNewGameRoundStart: () => void;
}

export default function HeaderComponent({ currentMark, gameRoundInfo, gameStatistic, onNewGameRoundStart }: Props) {
  return (
    <div className="header">
      <div className="header-row">
        <Statistic gameStatistic={gameStatistic} />
      </div>

      <div className="header-row">
        <RoundInfo
          currentMark={currentMark}
          gameRoundInfo={gameRoundInfo}
          onNewGameRoundStart={onNewGameRoundStart}
        />
      </div>
    </div>
  );
}
