const Controller = require("../core/Controller");

class Home extends Controller {
    constructor(_req, _res) {
        super(_req, _res);
    }

    print() 
    {
        console.log("here");
        const response = {title: 'TaskPi',
        headerData: { username: 'adar' },
        contentData: { text: 'Welcome to your dashboard' },
        footerData: { year: new Date().getFullYear()}}
        
        this.view.render("home", response);
    }
}

module.exports = Home;
