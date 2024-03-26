const ignoredPathParts = ['src', '__tests__'];

const formatTestName = (testFilePath: string): string => {
  const relativeTestFilePath = testFilePath.replace(process.cwd(), '');

  return relativeTestFilePath
    .split(/[/\\]/)
    .filter((token) => !!token && !ignoredPathParts.includes(token))
    .map((token) => token.replace('.test.ts', ''))
    .join(' > ');
};

export default formatTestName;
