
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.showLogin);
router.post('/verify-token', authController.verifyToken);
router.get('/auth/callback', authController.authCallback);

module.exports = router;
