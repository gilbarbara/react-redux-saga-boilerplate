import chalk from 'chalk';
import Rsync from 'rsync';

(() => {
  console.log(chalk.blue('Publishing...'));
  const rsync = new Rsync()
    .shell('ssh')
    .flags('az')
    .source(`dist/`)
    .destination(
      'reactboilerplate@react-boilerplate.com:/srv/users/reactboilerplate/apps/redux-saga/public',
    )
    .exclude('.DS_Store');

  rsync.execute((error, code, cmd) => {
    if (error) {
      console.log(chalk.red('Something went wrong...', error, code, cmd));
      process.exit(1);
    }

    console.log(chalk.green('Published'));
  });
})();
