'use strict';
const PORT = 3000;

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var morgan = require('morgan');
var path = require('path');
var app = express();


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function(req, res) {
  var indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});


var server = http.createServer(app);
server.listen(PORT, function() {
  console.log(`server listening on port: ${PORT}`);
});
