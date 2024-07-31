import { describeFunctionTest } from '@aminzer/describe-function-test';
import { GameRoundStatus } from '@app/constants';
import isGameRoundFinished from '../isGameRoundFinished';

describeFunctionTest(isGameRoundFinished, __filename, {
  testCases: [
    {
      args: [{ status: GameRoundStatus.IN_PROGRESS }],
      expectedResult: false,
    },
    {
      args: [{ status: GameRoundStatus.FINISHED }],
      expectedResult: true,
    },
  ],
});
