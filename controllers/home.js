const BaseController = require('../core/BaseController');
const createCalculatorKDFactory = require("../core/create_calculator_KD_factory");
const UserModel = require("../models/UserModel");
const TaskModel = require("../models/TaskModel");
const TaskSubmissionModel = require("../models/TaskSubmissionModel");
const createValidationFactory = require("../core/create_validation_factory");

class Home extends BaseController {
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
    const tasks_avilable = this.filterTasksByLevel(user[0].id, kd, user[0].level, tasks);
    this.render('home', {
      title: 'TaskPi',
      user: this.req.user, // או כל אובייקט משתמש רלוונטי
      level: user[0].level,
      kd,
      tasks: tasks_avilable,
      headerTitle:"TaskPi"
    });
        // try {
    //   const user = await this.userModel.findByUsername(this.req.user.username);
    //   if (!user) {
    //     return this.res.status(404).send("User not found");
    //   }

    //   const tasks = await this.taskModel.findAvailableForLevel(user.level);
    //   const tasks_submission = await this.task_submissionModel.findByUser(user.id);
    //   // בדיקה בלבד
    //   let html = `<h1>Hello ${user.username}</h1>`;
    //   html += `<p>Your balance: ${user.balance} π</p>`;
    //   html += `<h2>Available Tasks:</h2><ul>`;
    //   for (const task of tasks) {
    //     html += `<li><strong>${task.title}</strong>: ${task.description} (Reward: ${task.reward} π)</li>`;
    //   }
    //   html += `</ul>`;

    //   this.res.send(html);

    // } catch (err) {
    //   console.error("❌ Error in print():", err);
    //   this.res.status(500).send("Internal server error");
    // }
  }

  async claimTask(_params)
  {
    const user = await this.userModel.filter({id:this.req.user.id});
    const task = await this.taskModel.filter({id:_params.taskID}).then(tasks=>tasks[0]);
    const tasks_submission = await this.task_submissionModel.filter({user_id:this.req.user.id});
    const kd = this.calculatorKD(this.req.user.id, user[0].level, tasks_submission);
    const validation = new createValidationFactory('claim_task_validation', {kd, task, user:user[0], tasks:tasks_submission}).create();
    validation.validate();

    if(validation.errors.length)
    {
      this.json({flag:false, errors:validation.errors});
      return;
    }

    const response = await this.task_submissionModel.insert({task_id: task.id, user_id:user[0].id, level: task.required_level});

    return this.json({flag:true, response});

  }

  calculatorKD(_user_id = false, _user_level = false, _tasks=[])
  {
      return new createCalculatorKDFactory(_user_id, _user_level, _tasks).create().getKD();
  }

  filterTasksByLevel(_userID, _kd, _level, _tasks)
  {
      return _tasks.filter(task=>
        {
          return (
            task.publisher_id !== _userID &&
            (
              (task.reward <= _kd && task.required_level === _level) ||
              task.required_level < _level
            )
          );
        })
  }
}

module.exports = Home;
