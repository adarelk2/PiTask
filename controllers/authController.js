const axios = require('axios');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
require('dotenv').config();

class AuthController {
  constructor() {
    this.userModel = new UserModel();
  }

  // GET /login
  showLogin(req, res) {
    res.render('login');
  }

  // POST /verify-token
  async verifyToken(req, res) {
    const { piToken } = req.body;

    if (!piToken) {
      return res.status(400).json({ success: false, message: 'Missing Pi token' });
    }

    try {
      // 1. Verify Pi token with Pi Network API
      const response = await axios.get('https://api.minepi.com/v2/me', {
        headers: { Authorization: `Bearer ${piToken}` }
      });

      console.log("✅ Verified Pi Token:", response.data);
      let { username, wallet_address } = response.data;

      if (!wallet_address) {
        wallet_address = "UNVERIFIED";
      }

      // 2. Check if user exists in DB
      let users = await this.userModel.filter({ username });

      if (users.length === 0) {
        await this.userModel.insert({
          username,
          pi_wallet_address: wallet_address,
          level: 1,
          balance: 0
        });
        users = await this.userModel.filter({ username });
      }

      const user = users[0];

      // 3. Create JWT
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          pi_wallet_address: user.pi_wallet_address,
          level:user.level,
          email: user.email,
          ENV: process.env.NODE_ENV
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ success: true, token });

    } catch (err) {
      console.error('❌ Token verification failed or DB error:', err.response?.data || err.message);
      res.status(401).json({ success: false, message: 'Invalid token or DB error' });
    }
  }

  // GET /auth/callback
  authCallback(req, res) {
    res.redirect('/dashboard');
  }
}

module.exports = AuthController;
