const axios = require('axios');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
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
    console.log("im here 12 new");
    console.log(response);
    let { username, wallet_address } = response.data;

    if (!wallet_address) {
      wallet_address = "GAZ7T6NMYNISMPMX7SS775NW4WVZIZHYOOYG7PFHHVASRTCUHF3W6WIG";
      // return res.status(400).json({
      //   success: false,
      //   message: 'You must allow access to your wallet address to log in.'
      // });
    }

    let users = await userModel.filter({ username:username});

    if (users.length === 0) {
      await userModel.insert({
        username,
        pi_wallet_address: wallet_address,
        level: 1,
        accuracy: 1.0,
        balance: 0
      });
      users = await userModel.filter({ id: username });
    }

    const user = users[0];

    // יצירת JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

//     // שמירת העוגייה
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 60 * 60 * 1000
//     });

    res.json({
      success: true,
      token, // זה ה־JWT
    });

  } catch (err) {
    console.error('Token verification failed or DB error:', err);
    res.status(401).json({ success: false, message: 'Invalid token or DB error' });
  }
};

exports.authCallback = (req, res) => {
  res.redirect('/dashboard');
};