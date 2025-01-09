module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@context/(.*)$": "<rootDir>/src/context/$1",
    "^@shared/(.*)$": "<rootDir>/src/context/shared/$1",
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1"
  },
  testMatch: [
    "<rootDir>/tests/**/*.+(test.ts)"
  ],
  cacheDirectory: ".tmp/jestCache",
  setupFilesAfterEnv: [
    "<rootDir>/tests/setup.ts"
  ],
  testEnvironmentOptions: {
    NODE_ENV: "test"
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "src/utils/log",
    "src/utils/decorators"
  ]

};