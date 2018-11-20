var createError = require('http-errors');
var express = require('express');     // 调用 express 模块
var path = require('path');  // 调用 path 模块
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var adminRouter = require('./app/routes/admin');  // 调用admin.js路由文件

var app = express();   // 实例化 express

// 设置模板引擎后缀为 html
app.set('views', path.join(__dirname, 'app/views'));  // 设置模板存储的位置
app.set('view engine','html');  // 设置模板引擎后缀为 html
app.engine('html',require('ejs').renderFile); //使用ejs模板引擎解析html

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  // 静态文件目录

app.use('/admin', adminRouter);  // 调用admin路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('admin/error');
});

module.exports = app;
