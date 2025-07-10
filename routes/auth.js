const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const authController = require('../controllers/authController');

// התחברות
router.get('/login', authController.showLogin);
router.post('/verify-token', authController.verifyToken);

// שימוש במפתח פרודקשן מהפורטל (מותר לך להשאיר אותו פתוח אם השרת מאובטח)
const PI_API_KEY = "xbdryzovdb6ejryiaexe2ibtvmetdr3bjlvw15hexbrvifoghgxgyuxbntpivynl";

// אישור והשלמת תשלום (Production)
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

// התנתקות
router.get('/logout', (req, res) => {
  console.log("im here 12");
  res.clearCookie('token');
  res.redirect('/auth/login');
});

module.exports = router;
