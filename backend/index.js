/**
*   __init__
*   Server router for Node.JS handler.
* 
**/
var express      = require('express');
var Promise      = require("bluebird");
var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var app          = express();
var http         = require('http');
var router       = express.Router();
var routes       = require('./routes.js').routes;

console.info("Booting up...");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: false 
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.info("Setting up public folder...");

/**
* Routing controllers sets.
**/
app.use("/", function(req, res, next){
  res.json({
    "error": 404,
    "message": "Can't access to / endpoint."
  });
});
app.use(routes);
console.info("Setting up routes handler...");

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    var err = new Error('Not Found');
    err.status = 400;
    next(err);
  });
}

app.use(function(err, req, res, next) {
  if(err) {
    var err = new Error('Server error');
    err.status = 500;
    next(err);
  }
});
console.info("Setting up error handlers...");

/**
 * Create HTTP server.
 */
app.set('port', 3000);
http.createServer(app).listen(3000);
console.info("Server Running...");