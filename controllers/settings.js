const BaseController = require('../core/BaseController');
const UserModel = require("../models/UserModel");
const EmailVerificationsModel = require('../models/EmailVerificationsModel');

const userService = require('../services/userService');

class Settings extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.userModel = new UserModel();
  }

  async print() {
    const user = await this.userModel.getUserById(this.req.user.id);
    this.render('settings', {
      title: 'TaskPi - Settings',
      user: user,
      headerTitle: "TaskPi"
    });
  }

  async update_details(_params)
  {
    const email = _params.email
    const users = await this.userModel.filter({email: email});
    if(users.length)
      return this.json({flag:false, errors:[this.errors.DATABASE.DUPLICATE_ENTRY]});

    
    // const pi_wallet_address = _params.wallet_address;
    // if (!userService.isValidPiWallet(pi_wallet_address)) {
    //   return this.json({flag:false, errors:[this.errors.VALIDATION.INVALID_WALLET]});
    // }
    const isValidEmail = typeof _params.email === "string" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_params.email);

    if (!isValidEmail) {
      return this.json({flag:false, errors:[this.errors.VALIDATION.INVALID_EMAIL]});
    }

    const otpGenerator = require("otp-generator");

    const code = otpGenerator.generate(8, {
      upperCaseAlphabets: true,
      specialChars: true,
      lowerCaseAlphabets: true
    });
    
    const emailModel = new EmailVerificationsModel();
    emailModel.insert({email,user_id:this.req.user.id,code});

    const nodemailer = require("nodemailer");
    
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",   // ✅ use host instead of service
      port: 587,                    // TLS
      secure: false,                // must be false for 587
      auth: {
        user: process.env.EMAIL_ADDRESS,    // your Office email
        pass: process.env.EMAIL_PASSWORD // app password or account password
      },
      tls: {
        rejectUnauthorized: false   // sometimes needed for self-signed certs
      }
    });
    
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Your Code",
      text: `Code: ${code}`,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return this.json({flag:false, errors:[error]});
      }
      return this.json({flag:true,msg:"Done"});

    });
  }

  async check_otp(_params)
  {
      const emailModel = new EmailVerificationsModel();
      const auth = await emailModel.filter({user_id:this.req.user.id, code:_params.code, status:'pending'});
      if(auth.length)
      {
        await emailModel.update({id:auth[0].id},{status:'verified'});
        await this.userModel.update({id:auth[0].user_id},{email:auth[0].new_email});
        return this.json({flag:true,msg:"Done"});
      }
      
      return this.json({flag:false, errors:[this.errors.AUTH.INVALID_TOKEN]});
  }
}

module.exports = Settings;
