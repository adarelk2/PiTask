const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Application = require('../core/Application');

router.get('/:controller?', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/auth/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // נשתמש בזה בתוך Application
    const app = new Application(req, res);
    app.init();
  } catch (err) {
    console.log('Invalid JWT:', err.message);
    return res.redirect('/auth/login');
  }
});

module.exports = router;
