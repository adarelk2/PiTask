const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');

// התחברות
router.get('/login', authController.showLogin);
router.post('/verify-token', authController.verifyToken);

router.post('/sandbox-approve', async (req, res) => {
  const { paymentId } = req.body;
  console.log(`Sandbox payment initiated: ${paymentId}`);

  // סימולציה של אישור תשלום
  // בעתיד תבדוק מול Pi API אם זה היה מצב PRODUCTION
  return res.status(200).json({ status: 'sandbox-approved' });
});


// התנתקות
router.get('/logout', (req, res) => {
  console.log("im here 12");
  res.clearCookie('token');
  res.redirect('/auth/login');
});


module.exports = router;
