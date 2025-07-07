const Controller = require("../core/Controller");

class Terms extends Controller {
    constructor(_req, _res) {
        super(_req, _res);
    }

    print() 
    {
        const response = {title: 'TaskPi',
        headerData: { username: '' },
        contentData: { text: 'Welcome to your dashboard' },
        footerData: { year: new Date().getFullYear()}}
        
        this.view.render("terms", response);
    }
}

module.exports = Terms;
