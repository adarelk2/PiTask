
const axios = require('axios');
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

    req.session.user = {
      uid,
      username,
      wallet: wallet_address
    };

    res.json({ success: true, user: req.session.user });
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

exports.authCallback = (req, res) => {
  res.redirect('/dashboard');
};
