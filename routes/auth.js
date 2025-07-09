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

// הנתיב עצמו
router.get('/getUserByToken', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

// Middleware
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.sendStatus(401);
  }
}

module.exports = router;
