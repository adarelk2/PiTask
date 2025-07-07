const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');

const indexRouter = require('./routes/index');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials')); // ✅ registers header/footer

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/auth/pi', async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ success: false, message: 'No access token received' });
  }

  try {
    const verifyResponse = await fetch('https://api.minepi.com/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const rawText = await verifyResponse.text();

    if (!verifyResponse.ok) {
      return res.status(verifyResponse.status).json({
        success: false,
        message: 'Token verification failed',
        status: verifyResponse.status,
        error: rawText
      });
    }

    let userData;
    try {
      userData = JSON.parse(rawText);
    } catch (jsonErr) {
      return res.status(500).json({
        success: false,
        message: 'Could not parse JSON from Pi response',
        raw: rawText
      });
    }

    if (userData.username) {
      res.json({ success: true, user: userData });
    } else {
      res.status(401).json({ success: false, message: 'username missing', user: userData });
    }

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Routes
app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
