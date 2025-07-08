require('dotenv').config(); // ✅ קודם כל!

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');

hbs.registerHelper('eq', function (a, b) {
  return a === b;
});
// ✨ ייבוא ראוטים
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth'); // חייב להגיע אחרי dotenv

const app = express(); // ❗ הגדרה של האפליקציה

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ✨ חיבור ראוטים
app.use('/auth', authRouter);
app.use('/', indexRouter);

// טיפול ב-404
app.use(function(req, res, next) {
  next(createError(404));
});

// טיפול בשגיאות
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
