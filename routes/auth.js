const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const router = express.Router();
const userModel = new UserModel();

// POST /auth/login

router.post('/login', async (req, res) => {
  const { user, accessToken, signature } = req.body;
  console.log("here 13");
  console.log(req.body);
  if (!user?.username || !signature || !accessToken) {
    return res.status(400).send('Missing Pi user data');
  }

  try {
    // ⬇ אימות מול שרת Pi
    const response = await axios.get('https://api.minepi.com/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const piResponse = response.data;

    if (piResponse.username !== user.username) {
      return res.status(403).send('Invalid Pi user');
    }
    console.log("here 32");
    console.log(piResponse);
    // ✅ משתמש תקין, צור JWT והמשך כמו קודם
    const piUser = {
      id: user.uid || '11111111-1111-1111-1111-111111111111',
      username: user.username
    };
    console.log("here 38");
    console.log(piUser);
    const existingUsers = await userModel.select({ username: piUser.username });

    if (existingUsers.length === 0) {
      await userModel.insert({
        id: null,
        username: piUser.username,
        pi_wallet_address: null,
        level: 1,
        accuracy: null,
        balance: 0
      });
    }

    const token = jwt.sign(piUser, process.env.JWT_SECRET || 'secret-key', {
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
    console.error('Login error:', err.message);
    return res.status(500).send('Server error');
  }
});

// GET /auth/login
router.get('/login', (req, res) => {
  res.render('login');
});

// GET /auth/logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
});

module.exports = router;
