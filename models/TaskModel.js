const Model = require('../core/Model');

class TaskModel extends Model {
  constructor() {
    super('tasks', {
      id: ['s', 'id'],
      publisher_id: ['s', 'publisher_id'],
      title: ['s', 'title'],
      description: ['s', 'description'],
      reward: ['n', 'reward'],
      required_level: ['n', 'required_level'],
      proof_description: ['s', 'proof_description'],
      maxUsers:['n', 'maxUsers'],
      url: ['s', 'url'],
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
