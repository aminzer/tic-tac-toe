import { describeFunctionTest } from '@aminzer/describe-function-test';
import { Mark } from '@app/constants';
import invertMark from '../invertMark';

describeFunctionTest(invertMark, __filename, {
  testCases: [
    {
      args: [Mark.CROSS],
      expectedResult: Mark.NOUGHT,
    },
    {
      args: [Mark.NOUGHT],
      expectedResult: Mark.CROSS,
    },
  ],
});
