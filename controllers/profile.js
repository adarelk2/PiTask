const BaseController = require('../core/BaseController');
const UserModel = require("../models/UserModel");
const TaskModel = require("../models/TaskModel");
const TaskSubmissionModel = require("../models/TaskSubmissionModel");

class Profile extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.userModel = new UserModel();
    this.taskModel = new TaskModel();
    this.task_submissionModel = new TaskSubmissionModel();
  }

  async print() {
    const user = await this.userModel.filter({id:this.req.user.id});
    const tasks = await this.taskModel.filter({status:'active'})
    const tasks_submission = await this.task_submissionModel.filter({user_id:this.req.user.id, level: user[0].level})

    const kd = this.calculatorKD(this.req.user.id, user[0].level, tasks_submission);
    const tasks_avilable = this.filterTasksByLevel(kd, user[0].level, tasks);
    this.render('profile', {
      title: 'TaskPi - profile',
      user: this.req.user, // או כל אובייקט משתמש רלוונטי
      balance: user[0].balance,
      tasks: tasks_avilable,
      headerTitle:"TaskPi"
    });
  }
}

module.exports = Profile;
