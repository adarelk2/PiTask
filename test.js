// const EmailVerificationsModel = require('./models/EmailVerificationsModel');

// (async () => {
//   try {
//     const emailModel = new EmailVerificationsModel();
//     emailModel.insert({email:"adarelk2@gmail.com",user_id:8,code:"1234"});
//   } catch (err) {
//     console.error("❌ Error in UserModel test:", err);
//   }
// })();
const otpGenerator = require("otp-generator");
const code = otpGenerator.generate(8, {
  upperCaseAlphabets: true,
  specialChars: true,
  lowerCaseAlphabets: true
});

console.log(code); // למשל: "593284"