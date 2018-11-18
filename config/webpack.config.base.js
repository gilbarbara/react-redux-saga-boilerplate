/*eslint-disable no-console */
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const dateFns = require('date-fns');
const GitInfoPlugin = require('git-info-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require('./paths');

const NPMPackage = require(paths.packageJson);

const { NODE_ENV } = process.env;
const isProd = process.env.NODE_ENV === 'production';

const gitInfoPlugin = new GitInfoPlugin({
  hashCommand: 'rev-parse --short HEAD',
});

const cssLoaders = [
  isProd ? MiniCssExtractPlugin.loader : { loader: 'style' },
  {
    loader: 'css',
    options: {
      sourceMap: true,
    },
  },
  {
    loader: 'postcss',
    options: {
      sourceMap: true,
      plugins: [
        autoprefixer(),
      ],
    },
  },
  {
    loader: 'sass',
    options: {
      sourceMap: true,
      outputStyle: 'compact',
    },
  },
];

module.exports = {
  devtool: '#cheap-module-source-map',
  resolve: {
    alias: {
      assets: paths.assets,
      modernizr$: paths.modernizrrc,
      test: paths.test,
    },
    modules: [paths.appScripts, paths.nodeModules],
    extensions: ['.js', '.jsx', '.json'],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  context: paths.app,
  entry: {},
  output: {
    filename: '[name].[git-version].js',
    path: paths.destination,
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    gitInfoPlugin,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV || 'development'),
      APP__BRANCH: JSON.stringify(gitInfoPlugin.branch()),
      APP__BUILD_DATE: JSON.stringify(dateFns.format(new Date(), 'DD/MM/YYYY')),
      APP__GITHASH: JSON.stringify(gitInfoPlugin.hash()),
      APP__VERSION: JSON.stringify(NPMPackage.version),
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      cwd: process.cwd(),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        options: {
          cacheDirectory: false,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: cssLoaders,
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['url?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]'],
        include: /fonts/,
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file?name=fonts/[name].[ext]'],
        include: /fonts/,
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
          {
            loader: 'url-loader',
          },
        ],
        include: /media/,
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [
          `file?hash=sha512&digest=hex${isProd ? '&name=images/[name].[ext]' : ''}`,
          {
            loader: 'image-webpack',
            query: {
              optipng: {
                optimizationLevel: 5,
              },
              pngquant: {
                quality: '75-90',
              },
            },
          },
        ],
        include: /media/,
      },
      {
        test: /modernizrrc\.json$/,
        type: 'javascript/auto',
        use: ['expose?Modernizr', 'modernizr', 'json'],
      },
      {
        test: /\.md$/,
        use: ['html', 'markdown'],
      },
    ],
  },
};
