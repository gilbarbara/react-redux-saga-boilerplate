module.exports = {
  rootDir: '../',
  transform: {
    '.*': '<rootDir>/node_modules/babel-jest',
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
    '<rootDir>/test/__setup__/shim.js',
    '<rootDir>/test/__setup__/index.js',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/node_modules/jest-enzyme/lib/index.js',
  testRegex: '/test/.*?\\.(test|spec)\\.js$',
  testURL: 'http://localhost:3000',
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
