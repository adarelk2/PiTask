const BaseController = require('../core/BaseController');
const createCalculatorKDFactory = require("../core/createCalculatorKDFactory");
const UserModel = require("../models/UserModel");
const TaskModel = require("../models/TaskModel");
const TaskSubmissionModel = require("../models/TaskSubmissionModel");

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
    const tasks_avilable = this.filterTasksByLevel(kd, user[0].level, tasks);
    this.render('home', {
      title: 'TaskPi',
      user: this.req.user, // או כל אובייקט משתמש רלוונטי
      balance: user[0].balance,
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

    calculatorKD(_user_id = false, _user_level = false, _tasks=[])
    {
        return new createCalculatorKDFactory(_user_id, _user_level, _tasks).create().getKD();
    }

    filterTasksByLevel(_kd, _level, _tasks)
    {
        return _tasks.filter(task=>{
            return (task.reward <= _kd && task.required_level == _level) || task.required_level < _level ? true : false;
        })
    }
}

module.exports = Home;
