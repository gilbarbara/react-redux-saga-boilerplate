const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  app: resolvePath('app'),
  appHtml: resolvePath('assets/index.html'),
  appIndexJs: resolvePath('app/scripts/index.jsx'),
  appScripts: resolvePath('app/scripts'),
  assets: resolvePath('assets'),
  config: resolvePath('config'),
  destination: resolvePath('dist'),
  dotenv: resolvePath('.env'),
  modernizr: resolvePath('app/scripts/vendor/modernizr-custom.js'),
  modernizrrc: resolvePath('config/modernizrrc.json'),
  nodeModules: resolvePath('node_modules'),
  packageJson: resolvePath('package.json'),
  polyfills: resolvePath('app/scripts/polyfills'),
  publicPath: resolvePath('/'),
  root: resolvePath(''),
  store: resolvePath('app/scripts/store/index'),
  test: resolvePath('test'),
};
