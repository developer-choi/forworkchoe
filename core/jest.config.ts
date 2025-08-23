import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  verbose: true,
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.app.json',
        /**
         * verbatimModuleSyntax true 옵션을 사용하면 jest에서 오류가 발생해서 해결
         * https://github.com/kulshekhar/ts-jest/issues/4081#issuecomment-2665633234
         */
        isolatedModules: true
      },
    ],
  },
};

export default config;
