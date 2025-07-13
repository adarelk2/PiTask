const BaseController = require('../core/BaseController');
const userService = require('../services/userService');
const taskService = require('../services/taskService');

class Create_Task extends BaseController {
  constructor(req, res) {
    super(req, res);
  }

  async print() {
    const user = await userService.getUserById(this.req.user.id);
    const fee = parseFloat(process.env.PAYMENT_FEE) - 1;
    const roundedFee = parseFloat(fee.toFixed(2)); 
    this.render('create_task', {
      title: 'TaskPi - Create new task',
      user,
      paymentFee: process.env.PAYMENT_FEE,
      paymentFeePercent: roundedFee,
      headerTitle: "TaskPi"
    });
  }

  async create_new_task(_params) {
    const result = await taskService.createNewTask(this.req.user.id, _params);

    if (!result.flag) {
      this.json({ flag: false, errors: result.errors });
      return;
    }

    this.json({ flag: true });
  }
}

module.exports = Create_Task;
