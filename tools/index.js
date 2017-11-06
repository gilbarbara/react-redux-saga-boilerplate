/*eslint-disable no-var, vars-on-top, no-console */
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');
const del = require('del');
const chalk = require('chalk');
const ghPages = require('gh-pages');

const execAsync = promisify(exec);
const args = process.argv.slice(2);

if (!args[0]) {
  console.log(`Valid arguments:
  • publish (push to github)
  • deploy (build & publish)
  • docs (rebuild documentation)
  • update (if package.json has changed run \`npm update\`)
  • commits (has new remote commits)
  `);
}

function getCommit() {
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
  getCommit()
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

if (args[0] === 'publish') {
  publish();
}

if (args[0] === 'deploy') {
  const start = Date.now();
  console.log(chalk.green('Bundling...'));
  exec('npm run build:pages', errBuild => {
    if (errBuild) {
      console.log(chalk.red(errBuild));
      process.exit(1);
    }

    console.log(`Bundled in ${(Date.now() - start) / 1000} s`);

    publish();
  });
}

if (args[0] === 'docs') {
  del(['./docs/*'])
    .then(() => {
      console.log(chalk.blue('Generating documentation...'));
      return exec('./node_modules/.bin/esdoc -c config/esdoc.json ');
    })
    .catch(err => {
      console.log(chalk.red('docs:del'), err);
    });
}

if (args[0] === 'update') {
  exec('git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD', (err, stdout) => {
    if (err) {
      throw new Error(err);
    }

    if (stdout.match('package.json')) {
      exec('npm update').stdout.pipe(process.stdout);
    }
  });
}

if (args[0] === 'commits') {
  execAsync('git rev-parse --is-inside-work-tree')
    .then(() =>
      execAsync('git remote -v update')
        .then(() => {
          Promise.all([
            execAsync('git rev-parse @'),
            execAsync('git rev-parse @{u}'),
            execAsync('git merge-base @ @{u}'),
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
