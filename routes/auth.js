const express = require('express');
const router = express.Router();
require('dotenv').config();

const AuthController = require('../controllers/authController');
const PaymentController = require('../controllers/PaymentController');

const authController = new AuthController();
const paymentController = new PaymentController();

// 🔐 Auth
router.get('/login', (req, res) => authController.showLogin(req, res));
router.post('/verify-token', (req, res) => authController.verifyToken(req, res));
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
});

// 💳 Payments
router.post('/approve-production', (req, res) => paymentController.approve(req, res));
router.post('/complete-production', (req, res) => paymentController.complete(req, res));

module.exports = router;
