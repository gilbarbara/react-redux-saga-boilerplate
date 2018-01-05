/*eslint-disable  func-names, no-param-reassign prefer-arrow-callback, object-shorthand, no-console, prefer-template, vars-on-top */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractText = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const paths = require('./paths');
const webpackConfig = require('./webpack.config.base');

const NPMPackage = require(paths.packageJson);

const { APP_ENV } = process.env;

let GITHASH = '';
const definePlugin = webpackConfig.plugins.find(d => d.constructor.name === 'DefinePlugin');
if (definePlugin) {
  GITHASH = definePlugin.definitions.GITHASH ? definePlugin.definitions.GITHASH.replace(/"/g, '') : '';
}

module.exports = merge.smart(webpackConfig, {
  entry: {
    'scripts/modernizr': paths.modernizr,
    'scripts/app': paths.appIndexJs,
  },
  output: {
    chunkFilename: 'scripts/[name].[git-hash].js',
    filename: '[name].[git-hash].js',
    path: paths.destination,
    publicPath: APP_ENV === 'pages' ? '/react-redux-saga-boilerplate/' : '/',
  },
  devtool: 'source-map',
  plugins: [
    new CleanPlugin(['dist'], { root: path.join(__dirname, '../') }),
    new CopyPlugin([
      { from: '../assets/manifest.json' },
      { from: APP_ENV === 'pages' ? '../assets/404.html' : '../app/.htaccess' },
    ]),
    new ExtractText('styles/app.[git-hash].css'),
    new HtmlPlugin({
      githash: GITHASH,
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      template: './index.ejs',
      title: NPMPackage.title,
      baseHref: APP_ENV === 'pages' ? '/react-redux-saga-boilerplate/' : '',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: {
        keep_fnames: true,
      },
    }),
    new OfflinePlugin({
      autoUpdate: true,
      safeToUseOptionalCaches: true,
      ServiceWorker: {
        events: true,
      },
      AppCache: {
        events: true,
      },
      caches: {
        main: [
          '**/*.js',
          '**/*.css',
          'index.html',
        ],
        additional: [
          'fonts/*.woff',
          'fonts/*.ttf',
          'fonts/*.svg',
        ],
        optional: [
          ':rest:',
        ],
      },
      cacheMaps: [
        {
          match: function() {
            return new URL('/', location);
          },
          requestTypes: ['navigate'],
        },
      ],
    }),
  ],
});
