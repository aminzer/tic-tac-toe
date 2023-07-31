import React from 'react';
import { Mark } from '../../../constants';
import { GameRoundInfo, GameStatistic } from '../../../types';
import Statistic from './Statistic';
import RoundInfo from './RoundInfo';
import './styles.css';

interface HeaderProps {
  currentMark: Mark;
  gameRoundInfo: GameRoundInfo;
  gameStatistic: GameStatistic;
  onNewGameRoundStart: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentMark,
  gameRoundInfo,
  gameStatistic,
  onNewGameRoundStart,
}) => {
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
};

export default Header;
