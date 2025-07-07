const Controller = require("../core/Controller");

class Policy extends Controller {
    constructor(_req, _res) {
        super(_req, _res);
    }

    print() 
    {
        console.log("policy");
        this.view.render("policy", {});
    }
}

module.exports = Policy;
