const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const webpackKarmaConfig = Object.assign({}, webpackConfig, {
  entry: {},
  devtool: 'inline-source-map',
  plugins: new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('test')
  }),
  node: {
    fs: 'empty'
  },
  target: 'web',
  externals: {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
});

const srcGlob = 'app/scripts/**/*.+(js|jsx)';
const testGlob = 'test/*.spec.js';

module.exports = config => {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [testGlob],
    plugins: [
      'karma-chrome-launcher', 'karma-phantomjs-launcher', 'karma-mocha', 'karma-mocha-reporter',
      'karma-sourcemap-loader', 'karma-webpack', 'karma-coverage'
    ],
    preprocessors: {
      [srcGlob]: ['webpack', 'sourcemap'],
      [testGlob]: ['webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'json', subdir: './', file: 'coverage.json' },
        { type: 'text-summary' }
      ]
    },
    webpack: webpackKarmaConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
