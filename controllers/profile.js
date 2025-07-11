const BaseController = require('../core/BaseController');
const Controller = require('../core/Controller');
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
    const users= await this.userModel.filter({id:this.req.user.id});
    const user = users[0];

    const tasks_submission = await this.task_submissionModel.filter({user_id: user.id});

    let userController = new Controller(this.req, this.res).getController("home");
    const kd = userController.calculatorKD(user.id, user.level, tasks_submission);
    user.accuracy = kd;
    console.log(kd);
    
    this.render('profile', {
      title: 'TaskPi - profile',
      user: user, // או כל אובייקט משתמש רלוונטי
      submissions: tasks_submission,
      headerTitle:"TaskPi"
    });
  }
}

module.exports = Profile;
