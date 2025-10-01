const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserModel");

// ✅ Auth Middleware כתוסף פנימי
async function requireAuth(req, res, next) {
    if (process.env.NODE_ENV == "develop") {
      const userModel = new UserModel()
      const id = "104";
      const user = await userModel.getUserById(id);
      const token = jwt.sign(
        { id: user.id, username: user.username, pi_wallet_address:user.pi_wallet_address, email:user.email , ENV: process.env.NODE_ENV},
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      // תוכל להחזיר את זה ב-JSON או לשמור ב-localStorage
      res.cookie('token', token, {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7
      });
  
      req.cookies.token = token;
    }
  
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.token;
    const bodyToken = req.body?.token; // ✅ חדש
    const queryToken = req.query?.token; // ✅ חדש
    let token = null;
  
    if (authHeader?.startsWith?.('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (typeof cookieToken === 'string') {
      token = cookieToken;
    } 
    else if (typeof bodyToken === 'string') {
      token = bodyToken; // ✅ ייבחר אם אין שום דבר אחר
    }
    else if (typeof queryToken === 'string') {
      token = queryToken; // ✅ ייבחר אם אין שום דבר אחר
    }
  
    if (!token) {
      console.warn('🔒 Missing token');
      return res.redirect('/auth/login');
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      const isValidEmail = typeof req.user.email === "string" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.user.email);
      if((/*!userService.isValidPiWallet(req.user.pi_wallet_address) || */!isValidEmail) && (req.body.method !="update_details" && req.body.method !="check_otp"))
      {
        res.render('settings', {user:req.user});
      }
      else
        next();
    } catch (err) {
      console.warn('🔒 Invalid token');
      return res.redirect('/auth/login');
    }
  }
  
module.exports = requireAuth;
