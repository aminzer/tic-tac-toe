import React from 'react';
import { Mark } from '../../../../constants';
import { GameStatistic } from '../../../../types';
import WinCount from './WinCount';

interface StatisticProps {
  gameStatistic: GameStatistic;
}

const Statistic: React.FC<StatisticProps> = ({ gameStatistic: { winCount } }) => {
  return (
    <>
      <WinCount value={winCount[Mark.CROSS]} mark={Mark.CROSS} />
      x
      <WinCount value={winCount[Mark.NOUGHT]} mark={Mark.NOUGHT} />
    </>
  );
};

export default Statistic;
