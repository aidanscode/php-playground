const child_process = require('child_process');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

function writeTempFile(absolutePath, content, callback) {
  fs.writeFile(absolutePath, content, (fileIoErr) => {
    if (fileIoErr) {
      callback(fileIoErr);
    } else {
      callback(null, () => {
        fs.unlink(absolutePath, (fileRmErr) => {
          if (fileRmErr) {
            console.log('Failed to delete file!', absolutePath);
          }
        });
      });
    }
  });
}

const docker = {
  executePhp: (phpCode, callback) => {
    const filePath = '/usr/local/src/php-playground/';
    const fileName = uuidv4() + '.php';

    writeTempFile(filePath + fileName, phpCode, (writeFileErr, done) => {
      if (writeFileErr) {
        callback('Failed to write PHP to file');
        return;
      }

      child_process.exec('docker run --rm -v ' + filePath + fileName + ':/usr/local/src/' + fileName + ' -w /usr/local/src php:7.4-cli php ' + fileName, (err, stdout, stderr) => {
        if (err) {
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
