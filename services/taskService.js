const UserModel = require('../models/UserModel');
const TaskModel = require('../models/TaskModel');
const TaskSubmissionModel = require('../models/TaskSubmissionModel');
const createValidationFactory = require("../core/create_validation_factory");
const ERROR_MESSAGES = require("../constants/errors");

async function createNewTask(userId, params) {
  const userModel = new UserModel();
  const taskModel = new TaskModel();
  const taskSubmissionModel = new TaskSubmissionModel();

  const users = await userModel.filter({ id: userId });
  const user = users[0];

  if (!user) {
    return { flag: false, errors: [ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR] };
  }

  params.user = user;

  const validation = new createValidationFactory('create_new_task_validation', params).create();
  validation.validate();

  if (validation.errors.length) {
    return { flag: false, errors: validation.errors };
  }

  const totalCost = params.reward * params.max_users * process.env.PAYMENT_FEE;
  const newBalance = user.balance - totalCost;

  const updated = await userModel.update({ id: user.id }, { balance: newBalance });
  if (!updated) {
    return { flag: false, errors: [ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR] };
  }

  const taskID = await taskModel.insert({
    publisher_id: user.id,
    title: params.title,
    description: params.description,
    reward: params.reward,
    required_level: params.required_level,
    url: params.url,
    proof_description: params.proof_description,
    maxUsers: params.max_users
  });

  const insertions = [];
  for (let i = 0; i < params.max_users; i++) {
    insertions.push(taskSubmissionModel.insert({ task_id: taskID, user_id: 0 }));
  }
  await Promise.all(insertions);

  return { flag: true };
}

async function getSubmissionsWithTaskDetails(_params) 
{
    const submissions = await new TaskSubmissionModel().filter(_params);
    const taskModel = new TaskModel();
  
    for (const submission of submissions) {
      const tasks = await taskModel.filter({ id: submission.task_id });
      submission.task = {title: tasks[0].title, description: tasks[0].description, reward: tasks[0].reward};
      submission.submitted_at = changeFormatDate(submission.submitted_at)
    }
  
    return submissions;
  }

 function changeFormatDate(_date)
  {
    const submittedAt = new Date(_date);

    const day = String(submittedAt.getDate()).padStart(2, '0');
    const month = String(submittedAt.getMonth() + 1).padStart(2, '0');
    const year = submittedAt.getFullYear();
    const hours = String(submittedAt.getHours()).padStart(2, '0');
    const minutes = String(submittedAt.getMinutes()).padStart(2, '0');

    const formatted = `${day}/${month}/${year} ${hours}:${minutes}`;
    console.log(formatted); // 👉 "13/07/2025 20:08"

    return formatted;

  }
module.exports = {
  createNewTask,getSubmissionsWithTaskDetails
};
