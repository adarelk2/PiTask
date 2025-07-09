const express = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const router = express.Router();
const userModel = new UserModel();

// POST /auth/login
router.post('/login', async (req, res) => {
  console.log("🔐 POST /auth/login");

  const { user } = req.body;

  // בדיקה בסיסית
  if (!user?.username) {
    return res.status(400).send('Missing mock user data');
  }

  const piUser = {
    id: '11111111-1111-1111-1111-111111111111', // אפשר גם לייצר דינאמית
    username: user.username
  };

  try {
    // בדיקה במסד
    const existingUsers = await userModel.select({ username: piUser.username });

    if (existingUsers.length === 0) {
      await userModel.insert({
        id: null, // ייווצר אוטומטית (אם auto-increment או UUID ב-DB)
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
      secure: true,       // 💡 חובה בגלל iframe ב-HTTPS
      sameSite: 'None',   // 💡 חובה כדי ש־iframe יוכל לגשת
      maxAge: 3600000
    });

    // החזרה פשוטה – תומך גם במעקב מהלקוח
    return res.json({ success: true });

  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).send('Server error');
  }
});

// GET /auth/login – עמוד ההתחברות
router.get('/login', (req, res) => {
  res.render('login');
});

// GET /auth/logout – ניקוי העוגייה
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
});

module.exports = router;
