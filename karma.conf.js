const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfig = require('./config/webpack.config');

const webpackKarmaConfig = merge.smart(webpackConfig, {
  entry: {},
  plugins: new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('test')
  }),
  node: {
    fs: 'empty'
  },
  externals: {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
});

module.exports = config => {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['mocha'],
    files: ['test/index.js'],
    plugins: [
      'karma-chrome-launcher', 'karma-phantomjs-launcher',
      'karma-mocha', 'karma-mocha-reporter',
      'karma-sourcemap-loader', 'karma-webpack', 'karma-coverage'
    ],
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'json', subdir: './', file: 'coverage.json' },
        { type: 'text-summary' }
      ],
      includeAllSources: true,
      check: {
        global: {
          statements: 90,
          branches: 90,
          functions: 90,
          lines: 90
        }
      }
    },
    webpack: webpackKarmaConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
