const Model = require('../core/Model');

class TaskModel extends Model {
  constructor() {
    super('tasks', {
      id: ['n', 'id'],
      publisher_id: ['s', 'publisher_id'],
      title: ['s', 'title'],
      description: ['s', 'description'],
      reward: ['n', 'reward'],
      required_level: ['n', 'required_level'],
      proof_type: ['s', 'proof_type'],
      status: ['s', 'status']
    });
  }

  async findAvailableForLevel(level) {
    return await this.select({ 
      required_level: ['<=', level],
      status: 'active'
    });
  }

  async filter(_params = {}) {
    return await this.select(_params);
  }
}

module.exports = TaskModel;
