/*eslint-disable no-console */
const chalk = require('chalk');
const Rsync = require('rsync');

const paths = require('../config/paths');

function publish() {
  console.log(chalk.blue('Publishing...'));
  const rsync = new Rsync()
    .shell('ssh')
    .exclude('.DS_Store')
    .flags('az')
    .source(`${paths.appBuild}/`)
    .destination(
      'reactboilerplate@react-boilerplate.com:/home/reactboilerplate/public_html/redux-saga',
    );

  rsync.execute((error, code, cmd) => {
    if (error) {
      console.log(chalk.red('Something went wrong...', error, code, cmd));
      process.exit(1);
    }

    console.log(chalk.green('Published'));
  });
}

module.exports = publish;
