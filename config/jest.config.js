module.exports = {
  rootDir: '../',
  transform: {
    '.*': 'babel-jest',
  },
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
  ],
  moduleDirectories: [
    'node_modules',
    'app/scripts',
    './',
  ],
  moduleNameMapper: {
    '^app-store': '<rootDir>/app/scripts/store',
    '^.+\\.(css|scss)$': '<rootDir>/test/__setup__/styleMock.js',
    '^(.+\\.(jpe?g|png|gif|ttf|eot|svg|md)|bootstrap.*)$': '<rootDir>/test/__setup__/fileMock.js',
    '^(expose|bundle)': '<rootDir>/test/__setup__/moduleMock.js',
  },
  setupFiles: [
    'jest-localstorage-mock',
    '<rootDir>/test/__setup__/shim.js',
    '<rootDir>/test/__setup__/index.js',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/test/__setup__/setupTests.js',
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  testEnvironment: 'jest-environment-jsdom-global',
  testEnvironmentOptions: {
    resources: 'usable',
  },
  testRegex: '/test/.*?\\.(test|spec)\\.js$',
  testURL: 'http://localhost:3000',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    'app/scripts/**/*.{js,jsx}',
    '!app/scripts/vendor/*',
  ],
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 65,
      lines: 65,
      statements: 65,
    },
  },
  verbose: true,
};
