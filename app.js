var api = require('./api');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use('/public/js', express.static(path.join(__dirname, '/public/js')))
app.use('/public/css', express.static(path.join(__dirname, '/public/css')))
app.use('/public/images', express.static(path.join(__dirname, '/public/images')))

var port = process.env.PORT || 3000;


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get api
app.get('/api', api);

app.get('/RSS', (req,res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function() {
  console.log('GSX2JSON listening on port ' + port);
});
