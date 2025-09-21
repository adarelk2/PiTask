const EmailVerificationsModel = require('./models/EmailVerificationsModel');

(async () => {
  try {
    const emailModel = new EmailVerificationsModel();
    emailModel.insert({email:"adarelk2@gmail.com",user_id:8});
  } catch (err) {
    console.error("❌ Error in UserModel test:", err);
  }
})();
