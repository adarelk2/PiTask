const fs = require('fs');
const path = require('path');

class Controller {
  constructor(_req, _res) {
    this.req = _req;
    this.res = _res;
    this.errors = [];
    this.model;
    return this;
  }

  getControllersFiles = () => {
    const controllersPath = path.join(__dirname, '../controllers');
    return fs.readdirSync(controllersPath);
  }

  findControllerFileInsensitive = (_controller) => {
    const requested = _controller.toLowerCase() + '.js';
    const files = this.getControllersFiles();
    return files.find(file => file.toLowerCase() === requested) || null;
  }

  isControllerExist = (_controller) => {
    return !!this.findControllerFileInsensitive(_controller);
  }

  isMethodExist(_controller, _method) {
    const file = this.findControllerFileInsensitive(_controller);
    if (!file) return false;
  
    const ClassRef = require(path.join(__dirname, '../controllers', file));
    const instance = new ClassRef(this.req, this.res);
  
    // תיקון חשוב: בודק אם המתודה קיימת כולל בירושה
    return typeof instance[_method] === 'function';
  }
  

  getController = (_controller) => {
    const file = this.findControllerFileInsensitive(_controller);
    if (!file) throw new Error(`Controller file not found for '${_controller}'`);

    const filePath = path.join(__dirname, '../controllers', file);
    const ClassRef = require(filePath);
    return new ClassRef(this.req, this.res);
  }

  print() {
    const controller = this.req.params.controller;
    this.res.render('error', {
      errors: [controller + " has no print method"],
    });
  }
}

module.exports = Controller;
