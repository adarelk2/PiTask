require('dotenv').config(); // ✅ קודם כל!

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const cors = require('cors');

hbs.registerHelper('eq', function (a, b) {
  return a === b;
});

const app = express(); // ❗ הגדרה של האפליקציה

app.use(cors({
  origin: 'https://sandbox.minepi.com',
  credentials: true
}));
// ✨ ייבוא ראוטים
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth'); // מחבר את כל auth כולל Pi


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('trust proxy', 1);
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
