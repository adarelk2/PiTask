const BaseController = require('../core/BaseController');

class White_Paper extends BaseController {
    constructor(_req, _res) {
        super(_req, _res);
    }

    print() 
    {
        this.render('white_paper', {
            title: 'TaskPi - White Paper',
            user: this.req.user, // או כל אובייקט משתמש רלוונטי
            headerTitle:"TaskPi"
          });
    }
}

module.exports = White_Paper;
