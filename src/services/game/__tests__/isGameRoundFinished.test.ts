import { GameRoundStatus } from '../../../constants';
import { describeFunctionTest } from '../../../test';
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
