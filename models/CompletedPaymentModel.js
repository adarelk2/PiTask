const Model = require('../core/Model');

class CompletedPaymentModel extends Model {
  constructor() {
    super('completed_payments', {
      id: ['number', 'id'],
      user_id: ['string', 'user_id'],
      payment_id: ['string', 'payment_id'],
      amount: ['number', 'amount'],
      txid: ['string', 'txid'],
      completed_at: ['date', 'completed_at']
    });
  }
}

module.exports = CompletedPaymentModel;
