const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

const CompletedPaymentModel = require('../models/CompletedPaymentModel');
const UserModel = require('../models/UserModel');
const completedPaymentModel = new CompletedPaymentModel();
const userModel = new UserModel();
const authController = require('../controllers/authController');

// 🔐 PI API KEY מהפורטל
const PI_API_KEY = process.env.PI_API_KEY;

// התחברות
router.get('/login', authController.showLogin);
router.post('/verify-token', authController.verifyToken);

// ✅ אישור תשלום בלבד (approve)
router.post('/approve-production', async (req, res) => {
  const { paymentId } = req.body;
  if (!paymentId) {
    return res.status(400).json({ error: 'Missing paymentId' });
  }

  try {
    const headers = {
      Authorization: `Key ${PI_API_KEY}`,
      'X-Requested-With': 'XMLHttpRequest',
    };

    const approveRes = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      { headers }
    );

    console.log('✅ Payment approved:', approveRes.data);
    res.status(200).json({ status: 'approved' });

  } catch (err) {
    console.error('❌ Error approving payment:', err.response?.data || err.message);
    res.status(500).json({
      error: 'Failed to approve payment',
      details: err.response?.data || err.message
    });
  }
});

// ✅ השלמת תשלום (כולל אימות טוקן)
router.post('/complete-production', async (req, res) => {
  const { paymentId, txid, token } = req.body;
  console.log("im here 54");
  console.log(token);
  console.log(`paymentId: ${paymentId}`);
  console.log(`taxID: ${txid}`);
  if (!paymentId || !txid || !token) {
    return res.status(400).json({ error: 'Missing paymentId, txid or token' });
  }

  try {
    // 🧠 אימות JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.ENV != process.env.NODE_ENV)
    {
      return res.status(409).json({ error: 'Token auth is invalid.' });
    }
    const userId = decoded.id;

    // למניעת כפילות
    const existing = await completedPaymentModel.select({ payment_id: paymentId });
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Payment already processed' });
    }

    const headers = {
      Authorization: `Key ${PI_API_KEY}`,
      'X-Requested-With': 'XMLHttpRequest',
    };

    const completeRes = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      { txid },
      { headers }
    );

    const amount = completeRes.data.amount || 0;

    // עדכון איזון משתמש
    const users = await userModel.select({ id: userId });
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];
    const newBalance = (user.balance || 0) + amount;

    await userModel.update({ id: user.id }, { balance: newBalance });
    await completedPaymentModel.insert({
      user_id: user.id,
      payment_id: paymentId,
      amount,
      txid
    });

    console.log('✅ Payment completed and balance updated');
    res.status(200).json({
      status: 'done',
      tx: completeRes.data.transaction,
      newBalance
    });

  } catch (err) {
    console.error('❌ Error completing payment:', err.response?.data || err.message);
    res.status(500).json({
      error: 'Failed to complete payment',
      details: err.response?.data || err.message
    });
  }
});

// התנתקות
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
});

module.exports = router;
