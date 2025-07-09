const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const router = express.Router();
const userModel = new UserModel();

router.post('/login', async (req, res) => {
  const { accessToken, signature } = req.body;
  console.log("📩 Incoming login");
  console.log("Request body:", req.body);

  if (!accessToken || !signature) {
    return res.status(400).send('Missing Pi user data');
  }

  try {
    // ✅ אימות מול Pi כדי לשלוף את המשתמש האמיתי
    const response = await axios.get('https://api.minepi.com/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const piResponse = response.data;
    const username = piResponse.username;

    if (!username) {
      return res.status(403).send('Pi did not return a username');
    }

    console.log("✅ Verified Pi user:", username);

    const existingUsers = await userModel.select({ username });

    if (existingUsers.length === 0) {
      await userModel.insert({
        id: null,
        username,
        pi_wallet_address: null,
        level: 1,
        accuracy: null,
        balance: 0
      });
    }

    const userRecord = existingUsers[0] || { id: null, username };

    const token = jwt.sign({
      id: userRecord.id || '11111111-1111-1111-1111-111111111111',
      username
    }, process.env.JWT_SECRET || 'secret-key', { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 3600000
    });

    return res.json({ success: true });

  } catch (err) {
    console.error('❌ Login error:', err.message);
    return res.status(500).send('Server error');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
});

module.exports = router;
