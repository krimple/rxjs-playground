const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true}));
app.use('/', routes());

const server = app.listen(3000, () => {
  console.log('Running on port 3000');
});

function getChotchkieId(req) {
  return parseInt(req.params.id) || undefined;
}




