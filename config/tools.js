/*eslint-disable no-var, vars-on-top, no-console */
var path = require('path');
var exec = require('child_process').exec;
var del = require('del');
const chalk = require('chalk');
var ghPages = require('gh-pages');

var args = process.argv.slice(2);

if (!args[0]) {
  console.log(`Valid arguments:
  • publish (push to github)
  • deploy (build & publish)
  • docs (rebuild documentation)
  • update (if package.json has changed run \`npm update\`)
  • commits (has new remote commits)`
  );
}

function getCommit() {
  console.log('Getting commit...');
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
      console.log(chalk.blue('Copying README...'));
      exec('cp README.md dist/', (errCopy) => {
        if (errCopy) {
          console.log(errCopy);
          return;
        }

        ghPages.publish(path.join(__dirname, 'dist'), {
          message: commit
        });
      });
    });
}

if (args[0] === 'deploy') {
  const start = Date.now();
  console.log(chalk.green('Bundling...'));
  exec('npm run build', errBuild => {
    if (errBuild) {
      console.log(chalk.red(errBuild));
      process.exit(1);
    }

    console.log(`Bundled in ${(Date.now() - start) / 1000} s`);

    publish();
  });
}

if (args[0] === 'publish') {
  publish();
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
  exec('git remote -v update', (errRemote) => {
    if (errRemote) {
      throw new Error(errRemote);
    }

    var local = new Promise((resolve, reject) => {
      exec('git rev-parse @', (err, stdout) => {
        if (err) {
          return reject(err);
        }

        return resolve(stdout);
      });
    });

    var remote = new Promise((resolve, reject) => {
      exec('git rev-parse @{u}', (err, stdout) => {
        if (err) {
          return reject(err);
        }

        return resolve(stdout);
      });
    });

    var base = new Promise((resolve, reject) => {
      exec('git rev-parse @ @{u}', (err, stdout) => {
        if (err) {
          return reject(err);
        }
        return resolve(stdout);
      });
    });

    Promise.all([local, remote, base])
      .then(values => {
        const [$local, $remote, $base] = values;

        if ($local === $base) {
          console.error(chalk.red('⊘ Error: There are new commits.'));
          process.exit(1);
        }
      })
      .catch(err => {
        console.log(chalk.red('commits'), err);
      });
  });
}
