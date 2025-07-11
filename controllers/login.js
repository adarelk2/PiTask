const BaseController = require('../core/BaseController');

class Login extends BaseController {
    constructor(_req, _res) {
        super(_req, _res);
    }

    print() 
    {
        this.render('login', {
            title: 'TaskPi - Login',
            headerTitle:"TaskPi"
          });
    }
}

module.exports = Login;
