const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');

// התחברות
router.get('/login', authController.showLogin);
router.post('/verify-token', authController.verifyToken);

// התנתקות
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
});

// מסך ביניים
router.get('/session', (req, res) => {
  res.render('session-loader'); // תיצור views/session-loader.hbs
});

// אימות טוקן מה-localStorage ושמירתו בעוגייה
router.post('/session-verify', (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // שים את הטוקן כ-cookie עבור SSR
    res.cookie('token', token, {
      httpOnly: false, // ✅ כדי שיישלח מהלקוח (לא אידיאלי אבל הכרחי כאן)
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24
    });

    res.sendStatus(200);
  } catch {
    res.sendStatus(401);
  }
});

// מחזיר את המשתמש אם יש JWT תקף
router.get('/getUserByToken', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

// Middleware – אימות גם מ-Authorization וגם מ-cookie
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies?.token;

  let token = null;

  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (typeof cookieToken === 'string') {
    token = cookieToken;
  }

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.sendStatus(401);
  }
}

module.exports = router;
