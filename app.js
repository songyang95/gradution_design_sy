var express = require('express');
var router = express.Router();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var webpackDevMiddleware = require("webpack-dev-middleware");
var WebpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require("./webpack.config.js");
var webpack = require('webpack');

var index = require('./routes/index');
var users = require('./routes/users');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine(".html",require("ejs").renderFile);

var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    publicPath: "", // 大部分情况下和 `output.publicPath`相同,
    quiet: true
}));
app.use(WebpackHotMiddleware(compiler))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'upload')));
// app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, '')));
app.use(index);
app.use(users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
