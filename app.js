require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const hbs = require('hbs'); // הוסף את זה

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'taskpi_secret', resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// ⬇️ הרשמה של תיקיית ה-partials ⬇️
hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerHelper('eq', function (a, b) {
  return a === b;
});
// Routes
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
app.use('/auth', authRoutes);

app.use('/', indexRoutes);

module.exports = app;
