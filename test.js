const UserModel = require('./models/UserModel');

(async () => {
  try {
    const userModel = new UserModel();
    const user = await userModel.findByUsername('bob');
    console.log("✅ Found user:", user);
  } catch (err) {
    console.error("❌ Error in UserModel test:", err);
  }
})();
