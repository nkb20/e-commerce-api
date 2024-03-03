var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const { dbconnect } = require("./db_connection/connection");
var product = require('./routes/product');
var usersRouter = require('./routes/users');
const JsonResponse = require("./model/response_model");
const log=require("./loaders/logger")
dbconnect();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', product);
app.use('/api/v1/user', usersRouter);


app.use(function (req, res, next) {
  next(createError(404, "Page not found"));
});

app.use(function (err, req, res, next) {
log.debug(err)
  res.status(err.statusCode || 500).json(JsonResponse.error(err.message));
});

module.exports = app;
