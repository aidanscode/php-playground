const child_process = require('child_process');
const { v4: uuidv4 } = require('uuid');
const fileio = require('./fileio');

const docker = {
  startTimeLimitedContainer: (image, volume, workdir, entrypoint, callback) => {
    const maxRuntime = process.env.PHP_MAX_RUNTIME;
    const runtimeString = 'timeout ' + maxRuntime;
    const dockerCmd = 'docker run --rm -v ' + volume + ' -w ' + workdir + ' ' + image + ' ' + runtimeString + ' ' + entrypoint;

    child_process.exec(dockerCmd, callback);
  },
  executePhp: (phpCode, callback) => {
    const filePath = process.env.VOLUME_PATH;
    const fileName = uuidv4() + '.php';

    fileio.writeTempFile(filePath + fileName, phpCode, (writeFileErr, done) => {
      if (writeFileErr) {
        callback('Failed to write PHP to file');
        return;
      }

      docker.startTimeLimitedContainer(
        'php:7.4-cli', //image
        filePath + fileName + ':/usr/local/src/' + fileName, //volume
        '/usr/local/src/', //workdir
        'php ' + fileName, //entrypoint
        (err, stdout, _) => { //callback
          if (err) {
            if (err.code && err.code === 124)
              callback('Maximum execution runtime exceeded!');
            else
              callback(stdout);
          } else {
            callback(null, stdout);
          }
          done();
        }
      );
    });
  }
};

module.exports = docker;
