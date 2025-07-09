const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// existing routes
router.get('/login', authController.showLogin);
router.post('/verify-token', authController.verifyToken);
router.get('/auth/callback', authController.authCallback);

// logout route
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout failed:', err);
    }
    res.redirect('/login');
  });
});

module.exports = router;