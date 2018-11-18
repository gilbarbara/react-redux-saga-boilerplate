const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = [
  'js',
  'json',
  'jsx',
  'mjs',
];

const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(
    ext => fs.existsSync(resolveFn(`${filePath}.${ext}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

module.exports = {
  app: resolvePath('app'),
  appBuild: resolvePath('build'),
  appHtml: resolvePath('assets/index.html'),
  appIndexJs: resolveModule(resolvePath, 'app/scripts/index'),
  appScripts: resolvePath('app/scripts'),
  assets: resolvePath('assets'),
  config: resolvePath('config'),
  destination: resolvePath('dist'),
  dotenv: resolvePath('.env'),
  media: resolvePath('assets/media'),
  modernizr: resolvePath('app/scripts/vendor/modernizr-custom.js'),
  modernizrrc: resolvePath('config/modernizrrc.json'),
  nodeModules: resolvePath('node_modules'),
  packageJson: resolvePath('package.json'),
  polyfills: resolvePath('app/scripts/polyfills'),
  publicPath: resolvePath('/'),
  root: resolvePath(''),
  test: resolvePath('test'),
};
