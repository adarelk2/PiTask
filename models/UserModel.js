const Model = require('../core/Model');

class UserModel extends Model {
  constructor() {
    super('users', {
      id: ['n', 'id'],
      username: ['s', 'username'],
      pi_wallet_address: ['s', 'pi_wallet_address'],
      level: ['n', 'level'],
      accuracy: ['n', 'accuracy'],
      balance: ['n', 'balance']
    });
  }

  async filter(_params = {}) {
    return await this.select(_params);
  }
}

module.exports = UserModel;
