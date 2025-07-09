const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const router = express.Router();
const userModel = new UserModel();

router.post('/login', async (req, res) => {
  const { accessToken, signature } = req.body;
  console.log(req.body);
  console.log("📩 Production login initiated");
  if (!accessToken || !signature) {
    return res.status(400).send('Missing Pi user credentials');
  }

  try {
    // ✅ אמת את המשתמש מול Pi
    const response = await axios.get('https://api.minepi.com/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const piUser = response.data;

    if (!piUser?.username || !piUser.uid) {
      return res.status(403).send('Invalid Pi user');
    }

    const { username, uid } = piUser;
    console.log("✅ Verified Pi user:", username);

    // 💾 הוספה למסד אם לא קיים
    let existingUsers = await userModel.select({ username });

    if (existingUsers.length === 0) {
      await userModel.insert({
        id: null,
        username,
        pi_wallet_address: null,
        level: 1,
        accuracy: null,
        balance: 0
      });
      existingUsers = await userModel.select({ username });
    }

    const userRecord = existingUsers[0];

    // 🔐 צור JWT
    const token = jwt.sign({
      id: userRecord.id || uid,
      username
    }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

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
