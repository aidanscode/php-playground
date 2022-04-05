const fs = require('fs');

const fileio = {
  writeTempFile: (absolutePath, content, callback) => {
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
};

module.exports = fileio;
