module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/vendor/*'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  moduleDirectories: ['node_modules', 'src', './'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleNameMapper: {
    '^app-store': '<rootDir>/src/store',
    '\\.(css|scss)$': '<rootDir>/test/__mocks__/styleMock.js',
    '\\.(jpe?g|png|gif|ttf|eot|woff|md)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\.svg$': '<rootDir>/test/__mocks__/svgMock.js',
    '^(expose|bundle)': '<rootDir>/test/__mocks__/moduleMock.js',
  },
  setupFiles: ['<rootDir>/test/__setup__/setupFiles.js'],
  setupFilesAfterEnv: ['<rootDir>/test/__setup__/setupTests.js'],
  snapshotSerializers: ['enzyme-to-json/serializer', 'jest-serializer-html'],
  testEnvironment: 'jest-environment-jsdom-global',
  testEnvironmentOptions: {
    resources: 'usable',
  },
  testRegex: '/test/.*?\\.(test|spec)\\.js$',
  testURL: 'http://localhost:3000',
  transform: {
    '.*': 'babel-jest',
  },

  verbose: false,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
