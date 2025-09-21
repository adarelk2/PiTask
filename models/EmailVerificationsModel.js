const Model = require('../core/Model');

class EmailVerificationsModel extends Model {
  constructor() {
    super('email_verifications', {
      id: ['n', 'id'],
      user_id: ['n', 'user_id'],
      email: ['s', 'new_email'],
      code:['s','verification_code'],
      status:['s', 'status']
    });
  }

  async filter(_params = {}) {
    return await this.select(_params);
  }
}

module.exports = EmailVerificationsModel;
