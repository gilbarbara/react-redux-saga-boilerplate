/*eslint-disable no-var, vars-on-top, no-console */
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');

const chalk = require('chalk');
const ghPages = require('gh-pages');
const yargs = require('yargs');

const run = promisify(exec);

function getLastCommit() {
  console.log(chalk.blue('Getting the last commit...'));
  return new Promise((resolve, reject) => {
    exec('git log -1 --pretty=%s && git log -1 --pretty=%b', (err, stdout) => {
      if (err) {
        return reject(err);
      }

      const parts = stdout.replace('\n\n', '').split('\n');

      return resolve(`${(parts[0] ? parts[0] : 'Auto-generated commit')} ${new Date().toISOString()}`);
    });
  });
}

function publish() {
  console.log(chalk.blue('Publishing...'));
  getLastCommit()
    .then(commit => {
      exec('cp README.md dist/', errCopy => {
        if (errCopy) {
          console.log(errCopy);
          return;
        }
        ghPages.publish(path.join(__dirname, '../dist'), {
          message: commit,
        }, error => {
          if (error) {
            console.log(chalk.red('Something went wrong...', error));
            return;
          }

          console.log(chalk.green('Published'));
        });
      });
    });
}

function deploy() {
  const start = Date.now();
  console.log(chalk.green('Bundling...'));

  return exec('npm run build:pages', errBuild => {
    if (errBuild) {
      console.log(chalk.red(errBuild));
      process.exit(1);
    }

    console.log(`Bundled in ${(Date.now() - start) / 1000} s`);

    publish();
  });
}

function updateDependencies() {
  return run('git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD')
    .then(({ stdout }) => {
      if (stdout.match('package.json')) {
        console.log(chalk.yellow('▼ Updating...'));
        exec('npm update').stdout.pipe(process.stdout);
      } else {
        console.log(chalk.green('✔ Nothing to update'));
      }
    })
    .catch(err => {
      throw new Error(err);
    });
}

function checkUpstream() {
  return run('git rev-parse --is-inside-work-tree')
    .then(() =>
      run('git remote -v update')
        .then(() => {
          Promise.all([
            run('git rev-parse @'),
            run('git rev-parse @{u}'),
            run('git merge-base @ @{u}'),
          ])
            .then(([
              { stdout: $local },
              { stdout: $remote },
              { stdout: $base },
            ]) => {
              if ($local === $remote) {
                console.log(chalk.green('✔ Repo is up-to-date!'));
              } else if ($local === $base) {
                console.log(chalk.red('⊘ Error'), 'You need to pull, there are new commits.');
                process.exit(1);
              }
            })
            .catch(err => {
              if (err.message.includes('no upstream configured ')) {
                console.log(chalk.yellow('⚠ Warning'), 'No upstream. Is this a new branch?');
                return;
              }

              console.log(chalk.yellow('⚠ Warning'), err.message);
            });
        })
        .catch(err => {
          throw new Error(err);
        })
    )
    .catch(() => {
      console.log('not under git');
    });
}

module.exports = yargs
  .command({
    command: 'publish',
    desc: 'publish last build to pages',
    handler: publish,
  })
  .command({
    command: 'deploy',
    desc: 'build and publish to pages',
    handler: deploy,
  })
  .command({
    command: 'upstream',
    desc: 'has new remote commits',
    handler: checkUpstream,
  })
  .command({
    command: 'dependencies',
    desc: 'run `npm update` if package.json has changed',
    handler: updateDependencies,
  })
  .demandCommand()
  .help()
  .wrap(72)
  .version(false)
  .strict()
  .fail((msg, err, instance) => {
    if (err) {
      throw new Error(err);
    }

    console.error(`${chalk.red(msg)}
    `);
    console.log(instance.help());
    process.exit(1);
  })
  .argv;
