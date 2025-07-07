const fs = require('fs');
const path = require('path');
const View = require('./View');

class Controller {
    constructor(_req, _res) {
        this.req = _req;
        this.res = _res;
        this.errors = [];
        this.model;
        this.view = new View(_res);
        return this;
    }

    getControllersFiles = () => {
        const controllersPath = path.join(__dirname, '../controllers');
        const files = fs.readdirSync(controllersPath);
        return files;
    }

    isControllerExist = (_controller) => {
        return this.getControllersFiles().includes(_controller + ".js");
    }

    isMethodExist = (_controller, _method) => {
        if (!this.isControllerExist(_controller)) return false;

        const ClassRef = require("../controllers/" + _controller);
        const instance = new ClassRef(this.req, this.res);  // ✅ pass req/res to controller

        const prototype = Object.getPrototypeOf(instance);
        const methodNames = Object.getOwnPropertyNames(prototype)
            .filter(name => name !== 'constructor' && typeof instance[name] === 'function');

        return methodNames.includes(_method);
    }

    getController = (_controller) => {
        const ClassRef = require(path.join(__dirname, '../controllers/Home')); // TEMP: force load Home
        return new ClassRef(this.req, this.res);
    }

    print(){
        const controller = this.req.params.controller;
        this.res.render('error', {
            errors: [controller + " has no print method"],
        });
    }
}

module.exports = Controller;
