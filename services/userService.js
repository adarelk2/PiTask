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

function filterTasksByLevel(userID, kd, level, tasks) {
  return tasks.filter(task => {
    return (
      task.publisher_id !== userID &&
      (
        ((task.reward <= kd && task.required_level === level) ||
        task.required_level < level) &&
        task.counter < task.maxUsers
      )
    );
  });
}

async function incrementBalance(id, amount = 1) {
    const userModel = new UserModel();
    const user = await userModel.filter({id:id}).then(res=>res[0]);
    const updated = await userModel.update({id:id}, {balance: user.balance + amount});
    return updated;
  }
  

async function getUserById(id) {
  const userModel = new UserModel();
  const users = await userModel.filter({ id });
  return users[0];
}

async function getActiveTasks() {
  const taskModel = new TaskModel();
  return await taskModel.filter({ status: 'active' });
}

async function getUserSubmissions(user_id, level) {
  const taskSubmissionModel = new TaskSubmissionModel();
  return await taskSubmissionModel.filter({ user_id, level });
}

async function handleTaskClaim({ userId, taskId }) {
  const userModel = new UserModel();
  const taskModel = new TaskModel();
  const taskSubmissionModel = new TaskSubmissionModel();

  const user = await getUserById(userId);
  const tasks = await taskModel.filter({ id: taskId, status: 'active' });
  if (!tasks.length) {
    return { flag: false, errors: [ERROR_MESSAGES.TASK.TASK_NOT_FOUND] };
  }

  const task = tasks[0];
  const submissions = await taskSubmissionModel.filter({ user_id: userId });
  const kd = calculatorKD(userId, user.level, submissions);
  const validation = new createValidationFactory('claim_task_validation', { kd, task, user, tasks: submissions }).create();
  validation.validate();

  if (validation.errors.length)
    return { flag: false, errors: validation.errors };

  const task_submissions_avilable = await taskSubmissionModel.filter({ task_id: task.id, user_id: 0 });
  if (task_submissions_avilable.length) {
    await taskSubmissionModel.update({ id: task_submissions_avilable[0].id }, { user_id: user.id });
    await taskModel.update({ id: task.id }, { counter: task.counter + 1 });
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
  filterTasksByLevel,
  getUserById,
  getActiveTasks,
  getUserSubmissions,
  handleTaskClaim,
  calculatorMaxRewardByLevel,
  incrementBalance,
  isValidPiWallet
};
