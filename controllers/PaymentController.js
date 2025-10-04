const axios = require('axios');
const jwt = require('jsonwebtoken');
const CompletedPaymentModel = require('../models/CompletedPaymentModel');
const UserModel = require('../models/UserModel');

class PaymentController {
  constructor() {
    this.completedPaymentModel = new CompletedPaymentModel();
    this.userModel = new UserModel();
    this.PI_API_KEY = process.env.PI_API_KEY;
  }

  // ✅ אישור תשלום בלבד (approve)
  async approve(req, res) {
    const { paymentId } = req.body;
    if (!paymentId) {
      return res.status(400).json({ error: 'Missing paymentId' });
    }

    try {
      const headers = {
        Authorization: `Key ${this.PI_API_KEY}`,
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
  }

  // ✅ השלמת תשלום (כולל אימות טוקן)
  async complete(req, res) {
    const { paymentId, txid, token } = req.body;
    if (!paymentId || !txid || !token) {
      return res.status(400).json({ error: 'Missing paymentId, txid or token' });
    }

    try {
      // אימות JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.ENV != process.env.NODE_ENV) {
        return res.status(409).json({ error: 'Token auth is invalid.' });
      }
      const userId = decoded.id;

      // למניעת כפילות
      const existing = await this.completedPaymentModel.select({ payment_id: paymentId });
      if (existing.length > 0) {
        return res.status(409).json({ error: 'Payment already processed' });
      }

      const headers = {
        Authorization: `Key ${this.PI_API_KEY}`,
        'X-Requested-With': 'XMLHttpRequest',
      };

      const completeRes = await axios.post(
        `https://api.minepi.com/v2/payments/${paymentId}/complete`,
        { txid },
        { headers }
      );

      const amount = completeRes.data.amount || 0;

      // עדכון איזון משתמש
      const users = await this.userModel.select({ id: userId });
      if (users.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = users[0];
      const newBalance = (user.balance || 0) + amount;

      await this.userModel.update({ id: user.id }, { balance: newBalance });
      await this.completedPaymentModel.insert({
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
  }
}

module.exports = PaymentController;
