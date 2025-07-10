const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');

// התחברות
router.get('/login', authController.showLogin);
router.post('/verify-token', authController.verifyToken);

// התנתקות
router.get('/logout', (req, res) => {
  console.log("im here 12");
  res.clearCookie('token');
  res.redirect('/auth/login');
});


module.exports = router;
