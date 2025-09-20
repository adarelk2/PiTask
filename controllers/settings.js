const BaseController = require('../core/BaseController');
const UserModel = require("../models/UserModel");
const userService = require('../services/userService');
class Settings extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.userModel = new UserModel();
  }

  async print() {
    const user = await userService.getUserById(this.req.user.id);
    this.render('settings', {
      title: 'TaskPi - Settings',
      user: user,
      headerTitle: "TaskPi"
    });
  }

  async update_details(_params)
  {
    const email = _params.email
    // const pi_wallet_address = _params.wallet_address;
    // if (!userService.isValidPiWallet(pi_wallet_address)) {
    //   return this.json({flag:false, errors:[this.errors.VALIDATION.INVALID_WALLET]});
    // }
    const isValidEmail = typeof _params.email === "string" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_params.email);

    if (!isValidEmail) {
      return this.json({flag:false, errors:[this.errors.VALIDATION.INVALID_EMAIL]});
    }

    const updated = await this.userModel.update({id:this.req.user.id}, {email/*, pi_wallet_address*/})

    return this.json({flag:(updated)?true:false, errors:[]});
  }
}

module.exports = Settings;
