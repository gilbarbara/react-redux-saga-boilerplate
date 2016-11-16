/*eslint-disable no-var, func-names, prefer-arrow-callback, object-shorthand, no-console, prefer-template, vars-on-top */
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractText = require('extract-text-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');
var OfflinePlugin = require('offline-plugin');
var autoprefixer = require('autoprefixer');

var webpackConfig = require('./webpack.config');
var NPMPackage = require('./../package');

var config = merge.smart(webpackConfig, {
  entry: {
    '/scripts/app': './scripts/main.jsx',
    '/scripts/modernizr': './scripts/vendor/modernizr-custom.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
  },
  devtool: 'source-map',
  plugins: [
    new CleanPlugin(['dist'], { root: path.join(__dirname, '../') }),
    new CopyPlugin([
      { from: '.htaccess' },
      { from: 'robots.txt' }
    ]),
    new ExtractText('/styles/app.[hash].css'),
    new HtmlPlugin({
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      mobile: true,
      template: './index.ejs',
      title: NPMPackage.title
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: '/',
        postcss: function() {
          return {
            defaults: [autoprefixer],
            custom: [
              autoprefixer({
                browsers: [
                  'ie >= 9',
                  'ie_mob >= 10',
                  'ff >= 30',
                  'chrome >= 34',
                  'safari >= 7',
                  'opera >= 23',
                  'ios >= 7',
                  'android >= 4.4',
                  'bb >= 10'
                ]
              })
            ]
          };
        }
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ]
});

module.exports = config;
