/**
 * Require Dependancies
 */
var
  express       = require('express'),
  path          = require('path'),
  favicon       = require('serve-favicon'),
  logger        = require('morgan'),
  cookieParser  = require('cookie-parser'),
  bodyParser    = require('body-parser'),
  load          = require("express-load"),
  showErrors    = false;

/**
 * Create the application
 * @type {Application}
 */
var app = express();

/**
 * If show errors is not set to true then set it to true
 * but only for development env's
 */
if(!showErrors)
  showErrors = app.get('env') === 'development';


/**
 * Configure Modules
 *
 * 1. Configure development logging
 * 2. Enable JSON Body parsing
 * 3. Decode url encoded bodies
 */
app
  /*1*/.use(logger("dev"))
  /*2*/.use(bodyParser.json())
  /*3*/.use(bodyParser.urlencoded({ extended: false }));

/**
 * Configure the routes
 */
load("routes").into(app);

/**
 * catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  next(404);
});

/**
 * Configure development logging
 */
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: showErrors ? err : null
  });

});

module.exports = app;
