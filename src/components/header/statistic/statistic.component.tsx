import { Fragment } from 'react';
import { Mark } from '../../../constants';
import { GameStatistic } from '../../../types';
import WinCount from './win_count';

interface Props {
  gameStatistic: GameStatistic;
}

export default function StatisticComponent({ gameStatistic: { winCount } }: Props) {
  return (
    <Fragment>
      Score:
      <WinCount
        value={winCount[Mark.CROSS]}
        mark={Mark.CROSS}
      />
      -
      <WinCount
        value={winCount[Mark.NOUGHT]}
        mark={Mark.NOUGHT}
      />
    </Fragment>
  );
}
