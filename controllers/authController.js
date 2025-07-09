
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.verifyToken = (req, res) => {
  const { accessToken } = req.body;
  try {
    const decoded = jwt.verify(accessToken, process.env.PI_API_KEY, {
      algorithms: ['ES256']
    });
    req.session.user = {
      uid: decoded.uid,
      username: decoded.username,
      wallet: decoded.wallet_address,
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
