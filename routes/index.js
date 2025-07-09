const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Application = require('../core/Application');

// נתיב ראשי בלבד - לא כולל controller דינמי
router.get('/', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/auth/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key');
    req.user = decoded;

    const app = new Application(req, res);
    app.init();
  } catch (err) {
    console.log('Invalid JWT:', err.message);
    return res.redirect('/auth/login');
  }
});

// אם תרצה להוסיף דפים נוספים – תוסיף כאן ספציפיים, כמו:
router.get('/dashboard', (req, res) => {
  // TODO: אפשר להשתמש גם כאן ב־JWT אם אתה רוצה
  res.send('Dashboard page');
});

module.exports = router;
