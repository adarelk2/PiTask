const axios = require('axios');
const UserModel = require('../models/UserModel');
const userModel = new UserModel();
require('dotenv').config();

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.verifyToken = async (req, res) => {
  const { accessToken } = req.body;

  try {
    const response = await axios.get('https://api.minepi.com/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { uid, username, wallet_address } = response.data;

    if (!wallet_address) {
      return res.status(400).json({
        success: false,
        message: 'You must allow access to your wallet address to log in.'
      });
    }

    let users = await userModel.filter({ id: uid });

    if (users.length === 0) {
      await userModel.insert({
        id: uid,
        username,
        pi_wallet_address: wallet_address,
        level: 1,
        accuracy: 1.0,
        balance: 0
      });
      users = await userModel.filter({ id: uid });
    }

    const user = users[0];

    req.session.user = {
      id: user.id,
      username: user.username,
      wallet: user.pi_wallet_address,
      level: user.level
    };

    res.json({ success: true, user: req.session.user });
  } catch (err) {
    console.error('Token verification failed or DB error:', err);
    res.status(401).json({ success: false, message: 'Invalid token or DB error' });
  }
};

exports.authCallback = (req, res) => {
  res.redirect('/dashboard');
};