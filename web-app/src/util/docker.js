const child_process = require('child_process');
const { v4: uuidv4 } = require('uuid');
const fileio = require('./fileio');

const docker = {
  executePhp: (phpCode, callback) => {
    const filePath = process.env.VOLUME_PATH;
    const fileName = uuidv4() + '.php';

    fileio.writeTempFile(filePath + fileName, phpCode, (writeFileErr, done) => {
      if (writeFileErr) {
        callback('Failed to write PHP to file');
        return;
      }

      const maxRuntime = process.env.PHP_MAX_RUNTIME;
      child_process.exec('docker run --rm -v ' + filePath + fileName + ':/usr/local/src/' + fileName + ' -w /usr/local/src php:7.4-cli timeout ' + maxRuntime + ' php ' + fileName, (err, stdout, stderr) => {
        if (err) {
          if (err.code && err.code === 124)
            callback('Maximum execution runtime exceeded!');
          else
            callback(stdout);
        } else {
          callback(null, stdout);
        }
        done();
      });
    });
  }
};

module.exports = docker;
