import { Fragment } from 'react';
import { Mark } from '../../../constants';
import { GameStatistic } from '../../../types';

interface Props {
  gameStatistic: GameStatistic;
}

export default function StatisticComponent({ gameStatistic }: Props) {
  return (
    <Fragment>
      Score:
      <div className="score-mark-container score-mark-container-cross">
        {gameStatistic.winCount[Mark.CROSS]}
      </div>
      -
      <div className="score-mark-container score-mark-container-nought">
        {gameStatistic.winCount[Mark.NOUGHT]}
      </div>
    </Fragment>
  )
}
