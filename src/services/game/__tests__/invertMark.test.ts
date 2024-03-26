import { Mark } from '../../../constants';
import { describeFunctionTest } from '../../../test';
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
