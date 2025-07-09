const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Application = require('../core/Application');

router.get('/:controller?', (req, res) => {
  if(process.env.NODE_ENV == "staging")
  {
    let id = "11111111-1111-1111-1111-111111111111";
    let username = "alice"
        // יצירת JWT
        const token = jwt.sign(
          { id: id, username: username },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

            // ✅ שמור אותו ב-cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
  }
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
