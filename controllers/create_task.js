const BaseController = require('../core/BaseController');
const UserModel = require("../models/UserModel");
const TaskModel = require("../models/TaskModel");
const TaskSubmissionModel = require("../models/TaskSubmissionModel");


const createValidationFactory = require("../core/create_validation_factory");

class Create_Task extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.userModel = new UserModel();
    this.taskModel = new TaskModel();
    this.task_submissionModel = new TaskSubmissionModel();
  }

  async print() {
    const users= await this.userModel.filter({id:this.req.user.id});
    const user = users[0];
    const fee = parseFloat(process.env.PAYMENT_FEE) - 1; // לדוגמה 0.14999
    const roundedFee = parseFloat(fee.toFixed(2)); 
    this.render('create_task', {
      title: 'TaskPi - Create new task',
      user: user, // או כל אובייקט משתמש רלוונטי
      paymentFee: process.env.PAYMENT_FEE,
      paymentFeePercent: roundedFee,
      headerTitle:"TaskPi"
    });
  }

  async create_new_task(_params)
  {
    const users = await this.userModel.filter({id:this.req.user.id});
    const user = users[0];
    if(user.id)
    {
      _params.user = user;
      const validation = new createValidationFactory('create_new_task_validation', _params).create();
      validation.validate();
      if(validation.errors.length)
      {
        this.json({flag:false, errors:validation.errors});
      }
    }
  }
}

module.exports = Create_Task;
