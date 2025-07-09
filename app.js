require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'taskpi_secret', resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Routes
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.send(`<h2>Welcome ${req.session.user.username}</h2>`);
});

module.exports = app; // 👈 חשוב!
