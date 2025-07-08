const BaseController = require('../core/BaseController');

class Terms extends BaseController {
    constructor(_req, _res) {
        super(_req, _res);
    }

    print() 
    {
        this.render('terms', {
            title: 'TaskPi - Terms',
            user: this.req.user, // או כל אובייקט משתמש רלוונטי
            headerTitle:"TaskPi"
          });
    }
}

module.exports = Terms;
