const BaseController = require('../core/BaseController');
const UserModel = require("../models/UserModel");
const TaskModel = require("../models/TaskModel");
const TaskSubmissionModel = require("../models/TaskSubmissionModel");
const userService = require('../services/userService');
const taskService = require('../services/taskService');
const ERROR_MESSAGES = require('../constants/errors');

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

    const tasks_submission = await taskService.getSubmissionsWithTaskDetails({user_id: this.req.user.id});
    const kd = userService.calculatorKD(user.id, user.level, tasks_submission);
    user.accuracy = kd;
    console.log(kd);
    
    this.render('profile', {
      title: 'TaskPi - profile',
      user: user, // או כל אובייקט משתמש רלוונטי
      submissions: tasks_submission,
      headerTitle:"TaskPi"
    });
  }

  async startTask(_params)
  {
    const task_submissions = await this.task_submissionModel.filter({user_id: this.req.user.id, id:_params.task_submission_id, status:"pending"});
    if(task_submissions.length)
    {
      const task = await this.taskModel.filter({id:task_submissions[0].task_id}).then(task=>task[0]);
      if(task.required_level ==1)
      {
        await userService.incrementBalance(this.req.user.id, task.reward);
        await this.taskModel.update({ id: task.id }, { counter: task.counter + 1 });
        await this.task_submissionModel.update({ id: _params.task_submission_id }, { status: "approved"});

        return this.json({flag:true, level:task.required_level, url:task.url});
      }
    }

    return this.json({flag:false, errors:[ERROR_MESSAGES.TASK.TASK_NOT_FOUND]})
  }
}

module.exports = Profile;
