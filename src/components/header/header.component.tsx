import { Mark } from '../../constants';
import { GameRoundInfo, GameStatistic } from '../../types';
import Statistic from './statistic';
import RoundInfo from './round_info';

interface Props {
  currentMark: Mark;
  gameRoundInfo: GameRoundInfo;
  gameStatistic: GameStatistic;
  onNewGameRoundStart: () => void;
}

export default function HeaderComponent({ currentMark, gameRoundInfo, gameStatistic, onNewGameRoundStart }: Props) {
  return (
    <div className="info-container">
      <div className="info-container-row">
        <Statistic gameStatistic={gameStatistic} />
      </div>

      <div className="info-container-row">
        <RoundInfo
          currentMark={currentMark}
          gameRoundInfo={gameRoundInfo}
          onNewGameRoundStart={onNewGameRoundStart}
        />
      </div>
    </div>
  );
}
