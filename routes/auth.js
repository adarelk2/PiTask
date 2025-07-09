const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const UserModel = require('../models/UserModel');
const router = express.Router();

const userModel = new UserModel();

// GET /auth/login – עמוד התחברות
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { accessToken } = req.body;
  console.log('🔑 Received accessToken:', accessToken);

  try {
    const response = await axios.get('https://api.minepi.com/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const piUser = response.data;
    console.log('✅ Pi user data:', piUser);
    
    // (השארת הלוגיקה של הרשמה + JWT...)
    
  } catch (err) {
    console.error('❌ Pi auth error:', err.response?.data || err.message);
    return res.status(401).json({ success: false, message: 'Invalid Pi accessToken' });
  }
});

// // POST /auth/login – עיבוד גישה דרך Pi SDK
// router.post('/login', async (req, res) => {
//   const { accessToken } = req.body;

//   try {
//     // בקשה ל-Pi לקבלת פרטי משתמש
//     const response = await axios.get('https://api.minepi.com/me', {
//       headers: { Authorization: `Bearer ${accessToken}` }
//     });

//     const piUser = response.data; // מכיל uid, username

//     // בדיקה אם המשתמש קיים במערכת
//     const existing = await userModel.filter({ id: piUser.uid });

//     if (!existing.length) {
//       // הרשמה חדשה
//       await userModel.insert({
//         id: piUser.uid,
//         username: piUser.username,
//         pi_wallet_address: '', // אם אין לך דרך להביא את זה – תשאיר ריק
//         level: 1,
//         balance: 0,
//         accuracy: null
//       });
//     }

//     // יצירת JWT
//     const token = jwt.sign(
//       { id: piUser.uid, username: piUser.username },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     // שמירת העוגייה
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 60 * 60 * 1000
//     });

//     // תשובה
//     res.json({
//       success: true,
//       message: existing.length ? 'Logged in' : 'Registered + Logged in',
//       user: { id: piUser.uid, username: piUser.username }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ success: false, message: 'Invalid Pi accessToken' });
//   }
// });

module.exports = router;
