const BaseController = require('../core/BaseController');

class TestNet extends BaseController {
    constructor(_req, _res) {
        super(_req, _res);
    }

    async print() 
    {
        this.render('testnet', {
            title: 'TaskPi - Testnet',
            user:this.req.user,
            headerTitle:"TaskPi"
          });
    }
}

module.exports = TestNet;
