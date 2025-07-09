const express = require('express');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const UserModel = require('../models/UserModel');

const router = express.Router();
const userModel = new UserModel();

// POST /auth/login
router.post('/login', async (req, res) => {
  const { accessToken, user } = req.body;
  console.log("im her12e");
  console.log(process.env);
  console.log("out 14");
  const isSandbox = !process.env.PI_ENV || process.env.PI_ENV === 'sandbox';
  console.log(process.env);
  if (isSandbox) {
    const piUser = {
      id: '11111111-1111-1111-1111-111111111111',
      username: 'alice'
    };

    // בדיקה במסד
    const existingUsers = await userModel.select({ username: piUser.username });
    if (existingUsers.length === 0) {
      await userModel.insert({
        id: null, // ייווצר אוטומטית (אם auto-increment)
        username: piUser.username,
        pi_wallet_address: null,
        level: 1,
        accuracy: null,
        balance: 0
      });
    }

    const token = jwt.sign(piUser, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000
    });

    return res.redirect('/');
  }

  if (!accessToken) {
    return res.status(400).send('Missing access token');
  }

  try {
    const response = await fetch('https://api.minepi.com/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      const raw = await response.text();
      return res.status(401).send('Invalid Pi token: ' + raw);
    }

    const userData = await response.json();

    if (!userData?.username) {
      return res.status(400).send('No username returned from Pi');
    }

    const realUser = {
      id: 'pi-' + userData.username,
      username: userData.username
    };

    // בדיקה במסד
    const existingUsers = await userModel.select({ username: realUser.username });
    if (existingUsers.length === 0) {
      await userModel.insert({
        id: null,
        username: realUser.username,
        pi_wallet_address: null,
        level: 1,
        accuracy: null,
        balance: 0
      });
    }

    const token = jwt.sign(realUser, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000
    });

    res.redirect('/');
  } catch (err) {
    console.error('Pi API error:', err.message);
    res.status(500).send('Server error: ' + err.message);
  }
});

// GET /auth/login – מציג את עמוד ההתחברות עם env
router.get('/login', (req, res) => {
  res.render('login', {
    env: process.env.PI_ENV || 'sandbox'
  });
});

// GET /auth/login – מציג את עמוד ההתחברות עם env
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
});

module.exports = router;
