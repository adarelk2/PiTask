const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
  code = "code" in req.query ? req.query.code : false
  if(code)
  {
    const EmailVerificationsModel = require('../models/EmailVerificationsModel');
    const email_verifications = new EmailVerificationsModel();

    const UserModel = require('../models/UserModel');
    const userModel = new UserModel();
        
    email_verifications.filter({code, status:'pending'}).then(async(result)=>{
      if(result.length)
      {
        const user_id = result[0].user_id;
        const new_email = result[0].new_email;
        await userModel.update({id:user_id}, {email:new_email});
        await email_verifications.update({user_id},{status:'verified'})
        res.redirect('/auth/login');
      }
      else
      {
        res.json({msg:"error - OTP code"});
      }
    })
  }
  else
    res.json({msg:"error - OTP code"});
});


module.exports = router;
