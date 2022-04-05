require('dotenv').config();
console.log(process.env);
const { v4: uuidv4 } = require('uuid');
const docker = require('./util/docker');
const path = require('path');
const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.post('/execute', (req, res) => {
  if (!req.body.php) {
    res.status(400).json({error: 'No value for "php" specified'});
    return;
  }

  const php = req.body.php;
  if (!(typeof php === 'string' || php instanceof String)) {
    res.status(400).json({error: 'Input value for "php" must be a string'});
    return;
  }

  docker.executePhp(php, (err, output) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.json({ output: output });
    }
  });
});

const port = 8080;
app.listen(port, () => {
  console.log('App now listening for incoming requests on port ' + port);
});
