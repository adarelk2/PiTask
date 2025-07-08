const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// POST /auth/login
router.get('/login', async (req, res) => {
    res.render('login',{})
  const { accessToken } = req.body;

  // ✅ כאן אמור להיות אימות אמיתי מול Pi SDK.
  // כרגע נניח שזה היוזר:
  const piUser = {
    id: 'c2a3ee58-92fc-4cf9-bb2e-5a4a6de71c88',
    username: 'bob'
  };

  // יצירת JWT
  const jwtToken = jwt.sign(
    { id: piUser.id, username: piUser.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // שמירה ב-cookie
  res.cookie('token', jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 1000
  });

  res.json({ success: true, message: 'Logged in', user: piUser });
});

module.exports = router;
