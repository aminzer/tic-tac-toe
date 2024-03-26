export interface TestCase<Args extends unknown[], Result> {
  args: Args;
  expectedResult: Result;
  description?: string;
  only?: boolean;
}
