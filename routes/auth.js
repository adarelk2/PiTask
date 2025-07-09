const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// GET /auth/login — הצגת טופס ההתחברות
router.get('/login', (req, res) => {
  res.render('login', {});
});

// POST /auth/login — עיבוד התחברות
router.post('/login', async (req, res) => {
  const { accessToken } = req.body;

  // ⚠️ כאן אמור להיות אימות אמיתי מול Pi SDK
  // נניח שזה היוזר
  const piUser = {
    id: '11111111-1111-1111-1111-111111111111',
    username: 'alice'
  };

  // יצירת JWT
  const jwtToken = jwt.sign(
    { id: piUser.id, username: piUser.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // הגדרת העוגייה
  res.cookie('token', jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 1000
  });

  // שליחת תגובה אחת בלבד
  res.json({ success: true, message: 'Logged in', user: piUser });
});

module.exports = router;
