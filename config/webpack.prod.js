/*eslint-disable no-var, func-names, prefer-arrow-callback, object-shorthand, no-console, prefer-template, vars-on-top */
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractText = require('extract-text-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');
var OfflinePlugin = require('offline-plugin');
var webpackConfig = require('./webpack.config');

var NPMPackage = require('./../package');

var config = merge.smart(webpackConfig, {
  entry: {
    '/scripts/app': './scripts/main.jsx',
    '/scripts/modernizr': './scripts/vendor/modernizr-custom.js'
  },
  devtool: 'source-map',
  plugins: [
    new CleanPlugin(['dist'], { verbose: false }),
    new CopyPlugin([
      { from: '.htaccess' },
      { from: 'robots.txt' }
    ]),
    new ExtractText('/styles/app.[hash].css'),
    new HtmlPlugin({
      appMountId: 'react',
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      mobile: true,
      template: './index.ejs',
      title: NPMPackage.title
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});

module.exports = config;
