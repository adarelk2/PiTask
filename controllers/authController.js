const axios = require('axios');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const userModel = new UserModel();
require('dotenv').config();

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.verifyToken = async (req, res) => {
  const { piToken } = req.body;

  if (!piToken) {
    return res.status(400).json({ success: false, message: 'Missing Pi token' });
  }

  try {
    const response = await axios.get('https://api.minepi.com/v2/me', {
      headers: {
        Authorization: `Bearer ${piToken}`
      }
    });

    console.log("✅ Verified Pi Token:", response.data);
    let { username, wallet_address } = response.data;

    if (!wallet_address) {
      wallet_address = "UNVERIFIED";
    }

    let users = await userModel.filter({ username });

    if (users.length === 0) {
      await userModel.insert({
        username,
        pi_wallet_address: wallet_address,
        level: 1,
        accuracy: 1.0,
        balance: 0
      });
      users = await userModel.filter({ username });
    }

    const user = users[0];

    const token = jwt.sign(
      { id: user.id, username: user.username, ENV: process.env.NODE_ENV},
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ success: true, token });

  } catch (err) {
    console.error('❌ Token verification failed or DB error:', err.response?.data || err.message);
    res.status(401).json({ success: false, message: 'Invalid token or DB error' });
  }
};

exports.authCallback = (req, res) => {
  res.redirect('/dashboard');
};
