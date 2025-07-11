const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Application = require('../core/Application');

// ✅ Auth Middleware כתוסף פנימי
function requireAuth(req, res, next) {
  if (process.env.NODE_ENV == "staging") {
    const id = "8";
    const username = "adarelk4";
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // תוכל להחזיר את זה ב-JSON או לשמור ב-localStorage
    res.cookie('token', token, {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    req.cookies.token = token;
  }
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies?.token;
  const queryToken = req.query?.token; // ✅ חדש
  let token = null;

  if (authHeader?.startsWith?.('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (typeof cookieToken === 'string') {
    token = cookieToken;
  } else if (typeof queryToken === 'string') {
    token = queryToken; // ✅ ייבחר אם אין שום דבר אחר
  }

  if (!token) {
    console.warn('🔒 Missing token');
    return res.redirect('/auth/login');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.warn('🔒 Invalid token');
    return res.redirect('/auth/login');
  }
}



// ✅ הראוטר הראשי
router.get('/:controller?', requireAuth, (req, res) => {
  const app = new Application(req, res);
  app.init();
});

// ✅ הראוטר הראשי
router.post('/:controller?', requireAuth, (req, res) => {
  const app = new Application(req, res);
  app.init();

});

module.exports = router;
