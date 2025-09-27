const BaseController = require('../core/BaseController');
const userModel = require('../models/UserModel');
const taskModel = require('../models/TaskModel');
const TaskSubmissionModel = require('../models/TaskSubmissionModel');
const userService = require('../services/userService');

class Statistics extends BaseController {
    constructor(_req, _res) {
        super(_req, _res);
        this.userModel = new userModel()
        this.taskModel = new taskModel()
        this.taskSubmissionModel = new TaskSubmissionModel();
    }

    async print() 
    {
        const user = await this.userModel.getUserById(this.req.user.id);
        
        let balance = 0;
        let countUsers = 0;
        await this.userModel.filter({}).then(res=>{
            res.map(rowUser=>{
                balance += rowUser.balance;
                if(rowUser.email != null)
                    countUsers++;
            })
            return res.length});
        const TasksAvilable = await this.taskModel.filter({status:'active'})
        const TasksCompleted = await this.taskModel.filter({status:'completed'}).then(res=>res.length)

        const submissions = await this.taskSubmissionModel.getUserSubmissions(user.id, user.level);

        const kd = userService.calculatorKD(user.id, user.level, submissions);
        const countTasksAvilableForUser = await userService.getAvilableTasksForUser(user.id, kd, user.level, TasksAvilable).then(res=>res.length);
        
        
        let statistics = {countUsers, TasksAvilable: TasksAvilable.length, countTasksAvilableForUser, TasksCompleted, balance}

        this.render('statistics', {
            title: 'TaskPi - Statistics',
            statistics, // או כל אובייקט משתמש רלוונטי
            user,
            headerTitle:"TaskPi"
          });
    }
}

module.exports = Statistics;
