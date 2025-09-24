const Model = require('../core/Model');

class UserModel extends Model {
  constructor() {
    super('users', {
      id: ['n', 'id'],
      username: ['s', 'username'],
      email: ['s', 'email'],
      pi_wallet_address: ['s', 'pi_wallet_address'],
      level: ['n', 'level'],
      accuracy: ['n', 'accuracy'],
      balance: ['n', 'balance']
    });
  }

  async filter(_params = {}) 
  {
    return await this.select(_params);
  }

  async getUserById(id) 
  {
    const users = await this.filter({ id });
    return users[0];
  }

  async incrementBalance(id, amount = 1) 
  {
    const user = await this.filter({id:id}).then(res=>res[0]);
    const updated = await this.update({id:id}, {balance: user.balance + amount});
    return updated;
  }

}

module.exports = UserModel;
