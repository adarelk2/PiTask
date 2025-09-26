const UserModel = require('../models/UserModel');
const TaskModel = require('../models/TaskModel');
const TaskSubmissionModel = require('../models/TaskSubmissionModel');
const createCalculatorKDFactory = require('../core/create_calculator_KD_factory');
const createValidationFactory = require('../core/create_validation_factory');
const ERROR_MESSAGES = require('../constants/errors_en');

function calculatorKD(user_id, user_level, tasks) {
  return new createCalculatorKDFactory(user_id, user_level, tasks).create().getKD();
}

async function calculatorMaxRewardByLevel(_level)
{
  const userModel = new UserModel();

  const users = await userModel.filter({level:_level});
  let maxReward = 0.1;

  users.map(user=>{
    if(user.accuracy > maxReward)
      maxReward = user.accuracy;
  })

  return maxReward;
}

async function getAvilableTasksForUser(userID, kd, level, tasks) {
  const tasks_submission = {};
  const taskSubmissionModel = new TaskSubmissionModel();
  await taskSubmissionModel.findByUser(userID).then(res=>{
    res.map(row=>{
      tasks_submission[row.task_id] = row.status;
    })
  });
  
  return tasks.filter(task => {
    return (
      !(task.id in tasks_submission) &&
      task.publisher_id !== userID &&
      (
        ((task.reward <= kd && task.required_level === level) ||
        task.required_level < level) &&
        task.counter < task.maxUsers
      )
    );
  });
}

async function handleTaskClaim({ userId, taskId, errors}) {
  const userModel = new UserModel();
  const taskModel = new TaskModel();
  const taskSubmissionModel = new TaskSubmissionModel();

  const user = await userModel.getUserById(userId);
  const tasks = await taskModel.filter({ id: taskId, status: 'active' });
  if (!tasks.length) {
    return { flag: false, errors: [ERROR_MESSAGES.TASK.TASK_NOT_FOUND] };
  }

  const task = tasks[0];
  const submissions = await taskSubmissionModel.filter({ user_id: userId });
  const kd = calculatorKD(userId, user.level, submissions);
  const validation = new createValidationFactory('claim_task_validation', { kd, task, user, tasks: submissions, errors}).create();
  validation.validate();

  if (validation.errors.length)
    return { flag: false, errors: validation.errors };

  const task_submissions_avilable = await taskSubmissionModel.filter({ task_id: task.id, user_id: 0 });
  if (task_submissions_avilable.length) {
    const new_task_status = (task.counter + 1 == task.maxUsers) ? 'completed' : 'active';
    await taskSubmissionModel.update({ id: task_submissions_avilable[0].id }, { user_id: user.id });
    await taskModel.update({ id: task.id }, { counter: task.counter + 1, status: new_task_status});
    return { flag: true };
  }

  return { flag: false, errors: [ERROR_MESSAGES.TASK.TASK_NOT_FOUND] };
}

function isValidPiWallet(address) {
  return typeof address === "string" &&
    /^G[A-Z2-7]{55}$/.test(address);
}

module.exports = {
  calculatorKD,
  getAvilableTasksForUser,
  handleTaskClaim,
  calculatorMaxRewardByLevel,
  isValidPiWallet
};
