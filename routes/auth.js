const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const CompletedPaymentModel = require('../models/CompletedPaymentModel');
const UserModel = require('../models/UserModel');
const completedPaymentModel = new CompletedPaymentModel();
const userModel = new UserModel();

const authController = require('../controllers/authController');

// התחברות
router.get('/login', authController.showLogin);
router.post('/verify-token', authController.verifyToken);

// שימוש במפתח פרודקשן מהפורטל (מותר לך להשאיר אותו פתוח אם השרת מאובטח)
const PI_API_KEY = "xbdryzovdb6ejryiaexe2ibtvmetdr3bjlvw15hexbrvifoghgxgyuxbntpivynl";

// אישור והשלמת תשלום (Production)
router.post('/approve-production', async (req, res) => {
  const { paymentId } = req.body;
  console.log("im here 18");
  console.log(paymentId);
  if (!paymentId) {
    return res.status(400).json({ error: 'Missing paymentId' });
  }

  try {
    const headers = {
      Authorization: `Key ${PI_API_KEY}`,
      'X-Requested-With': 'XMLHttpRequest',
    };

    // שלב 1: אישור התשלום
    const approveRes = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      { headers }
    );
    console.log('✅ Payment approved:', approveRes.data);

    // שלב 2: השלמת התשלום
    const completeRes = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      {},
      { headers }
    );
    console.log('✅ Payment completed:', completeRes.data);

    res.status(200).json({ status: 'done', tx: completeRes.data.transaction });

  } catch (err) {
    console.error('❌ Error approving/completing payment:', err.response?.data || err.message);
    res.status(500).json({
      error: 'Failed to approve/complete production payment',
      details: err.response?.data || err.message
    });
  }
});

// שלב 2: השלמת התשלום (עכשיו דורש txid מהלקוח)
router.post('/complete-production', async (req, res) => {
  const { paymentId, txid } = req.body;

  if (!paymentId || !txid) {
    return res.status(400).json({ error: 'Missing paymentId or txid' });
  }

  try {
    // 🧱 הגנה כפולה — לא לאפשר תשלום כפול
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
    const sessionUser = req.session?.user;
    if (!sessionUser || !sessionUser.id) {
      return res.status(403).json({ error: 'User not authenticated' });
    }

    const users = await userModel.select({ id: sessionUser.id });
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
  console.log("im here 12");
  res.clearCookie('token');
  res.redirect('/auth/login');
});

module.exports = router;
