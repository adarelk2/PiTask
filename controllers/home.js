const BaseController = require('../core/BaseController');
const userService = require('../services/userService');
const ERROR_MESSAGES = require('../constants/errors');

class Home extends BaseController {
  constructor(req, res) {
    super(req, res);
  }

  async print() {
    const user = await userService.getUserById(this.req.user.id);
    const tasks = await userService.getActiveTasks();
    const submissions = await userService.getUserSubmissions(this.req.user.id, user.level);
    
    const kd = userService.calculatorKD(this.req.user.id, user.level, submissions);
    const tasks_avilableForUser = userService.filterTasksByLevel(user.id, kd, user.level, tasks);
    submissions.map(task_submission=>{
      if(task_submission.task_id in tasks_avilableForUser)
        delete tasks_avilableForUser[task_submission.task_id];
    })

    console.log(tasks_avilableForUser);

    this.render('home', {
      title: 'TaskPi',
      user: this.req.user,
      level: user.level,
      kd,
      tasks: tasks_avilableForUser,
      headerTitle: "TaskPi"
    });
  }

  async claimTask(_params) {
    const result = await userService.handleTaskClaim({
      userId: this.req.user.id,
      taskId: _params.taskID
    });

    if (!result.flag)
      return this.json({ flag: false, errors: result.errors });

    return this.json({ flag: true });
  }
}

module.exports = Home;
