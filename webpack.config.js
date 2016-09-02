/*eslint-disable no-var, one-var, func-names, indent, prefer-arrow-callback, object-shorthand, no-console, newline-per-chained-call, one-var-declaration-per-line, prefer-template, vars-on-top */
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractText = require('extract-text-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');
var OfflinePlugin = require('offline-plugin');
var autoprefixer = require('autoprefixer');

var NPMPackage = require('./package.json');

var isProd = process.env.NODE_ENV === 'production';
var isTest = process.env.NODE_ENV === 'test';

var cssLoaders = 'css!postcss?pack=custom!sass';
var config = {
  context: path.join(__dirname, 'app'),
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, './.modernizrrc')
    },
    modules: [path.join(__dirname, 'app/scripts'), 'node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  entry: {
    '/scripts/app': './scripts/main.jsx',
    '/scripts/modernizr': './scripts/vendor/modernizr-custom.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: isProd ? ExtractText.extract(cssLoaders) : 'style!' + cssLoaders
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&minetype=application/font-woff&name=/media/fonts/[name].[ext]',
        include: /fonts/
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file?name=/media/fonts/[name].[ext]',
        include: /fonts/
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loaders: [
          'file?hash=sha512&digest=hex' + (isProd ? '&name=/[path][name].[ext]' : ''),
          'image-webpack?bypassOnDebug=false&optimizationLevel=7&interlaced=false'
        ],
        include: /media/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.modernizrrc$/,
        loader: 'modernizr'
      },
      {
        test: /\.md$/,
        loader: 'html!markdown'
      }
    ]
  },
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
  },
  sassLoader: {
    sourceMap: true,
    sourceMapContents: true
  },
  cssLoader: {
    minification: isProd,
    sourceMap: true
  }
};

if (isProd) {
  config.plugins = config.plugins.concat([
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]);
}
else {
  config.plugins = config.plugins.concat(
    new webpack.NamedModulesPlugin()
  );
}

if (isTest || isProd) {
  config.plugins = config.plugins.concat([
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ]);
}

module.exports = config;
