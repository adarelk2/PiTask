const express = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const router = express.Router();
const userModel = new UserModel();

// POST /auth/login
router.post('/login', async (req, res) => {
  console.log("🔐 POST /auth/login");

  const { user, signature, accessToken } = req.body;
  console.log("im here13");
  console.log(req.body);
  if (!user?.username || !signature || !accessToken) {
    return res.status(400).send('Missing Pi Network user data');
  }

  // (בדמו לא מאמתים את החתימה - רק בmainnet)
  const piUser = {
    id: user.uid || '11111111-1111-1111-1111-111111111111', // fallback
    username: user.username
  };

  try {
    const existingUsers = await userModel.select({ username: piUser.username });
    console.log(existingUsers);
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
