const Model = require('../core/Model');

class TaskSubmissionModel extends Model {
  constructor() {
    super('task_submissions', {
      id: ['s', 'id'],                 // UUID string
      task_id: ['s', 'task_id'],       // UUID string
      user_id: ['s', 'user_id'],       // UUID string
      submission_data: ['s', 'submission_data'],
      status: ['s', 'status'],
      reviewer_id: ['s', 'reviewer_id'], // UUID string
      review_reason: ['s', 'review_reason'],
      reviewed_at: ['d', 'reviewed_at'],
      submitted_at: ['d', 'submitted_at'],
      level: ['n', 'level']
    });
  }

  async findByUser(userId) {
    return await this.select({ user_id: userId });
  }

  async findPendingForReviewer(reviewerId) {
    return await this.select({ 
      status: 'pending',
      reviewer_id: reviewerId
    });
  }

  async filter(params = {}) {
    return await this.select(params);
  }

  async getUserSubmissions(user_id, level) 
  {
    return await this.filter({ user_id, level });
  }
}

module.exports = TaskSubmissionModel;
