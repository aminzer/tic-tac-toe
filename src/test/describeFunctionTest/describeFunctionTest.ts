import formatTestName from './formatTestName';
import identity from './identity';
import { TestCase } from './types';

const describeFunctionTest = <Args extends unknown[], Result>(
  functionToTest: (...args: Args) => Result,
  testFilePath: string,
  {
    testCases,
    prepareResult = identity,
  }: {
    testCases: TestCase<Args, Result>[];
    prepareResult?: (result: Result) => unknown;
  },
): void => {
  describe(formatTestName(testFilePath), () => {
    testCases.forEach(({ args, expectedResult, description, only }) => {
      const describeTestCase = only ? describe.only : describe;

      describeTestCase(description ?? `when arguments are ${JSON.stringify(args)}`, () => {
        it(`returns ${JSON.stringify(expectedResult)}`, () => {
          const result = functionToTest(...args);

          expect(prepareResult(result)).toEqual(prepareResult(expectedResult));
        });
      });
    });
  });
};

export default describeFunctionTest;
