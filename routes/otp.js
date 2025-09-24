const express = require('express');
const router = express.Router();
const querystring = require('querystring');

router.get('/', async (req, res) => {
  // parse the raw query string manually
  const rawQuery = req.originalUrl.split('?')[1] || '';
  const parsed = querystring.parse(rawQuery);
  const code = parsed.code || false;

  if (code) {
    const EmailVerificationsModel = require('../models/EmailVerificationsModel');
    const email_verifications = new EmailVerificationsModel();

    const UserModel = require('../models/UserModel');
    const userModel = new UserModel();

    try {
      const result = await email_verifications.filter({ code, status: 'pending' });
      if (result.length) {
        const user_id = result[0].user_id;
        const new_email = result[0].new_email;

        await userModel.update({ id: user_id }, { email: new_email });
        await email_verifications.update({ user_id }, { status: 'verified' });

        return res.redirect("pi://taskpi.work/auth/login");
      }
      return res.json({ msg: "error - OTP code" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "internal error" });
    }
  } else {
    return res.json({ msg: "error - OTP code" });
  }
});

module.exports = router;
