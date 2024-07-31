export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
  },
};
