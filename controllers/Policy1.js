const BaseController = require('../core/BaseController');

class Policy extends BaseController {
    constructor(_req, _res) {
        super(_req, _res);
    }

    print() 
    {
        this.render('policy', {
            title: 'TaskPi - Policy',
            user: this.req.user, // או כל אובייקט משתמש רלוונטי
            headerTitle:"TaskPi"
          });
    }
}

module.exports = Policy;
