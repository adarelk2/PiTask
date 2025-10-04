const BaseController = require('../core/BaseController');
const UserModel = require("../models/UserModel");

class Buy_Pi extends BaseController {
    constructor(_req, _res) {
        super(_req, _res);
        this.userModel = new UserModel();
    }

    async print() 
    {
        const users = await this.userModel.filter({id: this.req.user.id});

        const user = users[0];
        this._render('buy_pi', {
            title: 'TaskPi - Buy Pi',
            user: user, // או כל אובייקט משתמש רלוונטי
            headerTitle:"TaskPi"
          });
    }
}

module.exports = Buy_Pi;
