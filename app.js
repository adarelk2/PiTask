require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const i18n = require("i18n");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// i18n configuration
i18n.configure({
  locales: ['en', 'he'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  queryParameter: 'lang', // מאפשר /?lang=en
  cookie: 'lang',
  autoReload: true,
});

app.use(i18n.init);

// expose lang + dir to templates
app.use((req, res, next) => {
  res.locals.lang = req.getLocale();
  res.locals.dir = req.__('dir');
  next();
});

// HBS view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// HBS helpers
hbs.registerHelper('eq', (a, b) => a === b);
hbs.registerHelper('inc', value => parseInt(value, 10) + 1);
hbs.registerHelper('__', function () {
  return i18n.__.apply(this, arguments);
});

// Routes
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

if (process.env.SERVER_MODE === "off") {
  app.use((req, res) => {
    res.render('error', { errors: ["Website is Offline"] });
  });
} else {
  app.use('/auth', authRoutes);
  app.use('/', indexRoutes);
}

module.exports = app;
