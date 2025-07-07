const Controller = require('./Controller');

class Application {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.controllerName = req.params.controller || 'home';
    this.methodName = req.query.method || 'print';
    this.params = req.query.params || {};
    this.errors = [];
    this.controllerLoader = new Controller(req, res);
  }

  init = () => {
    if (!this.isValidRequest()) {
      return this.res.status(500).render('error', { errors: this.errors });
    }

    const controllerInstance = this.controllerLoader.getController(this.controllerName);

    if (typeof controllerInstance[this.methodName] === 'function') {
      controllerInstance[this.methodName](this.params);
    } else {
      this.res.render('error', { errors: [`Method '${this.methodName}' not found`] });
    }
  }

  isValidRequest = () => {
    const exists = this.controllerLoader.isControllerExist(this.controllerName);
    if (!exists) {
      this.errors.push(`Controller '${this.controllerName}' not found`);
      return false;
    }

    const methodExists = this.controllerLoader.isMethodExist(this.controllerName, this.methodName);
    if (!methodExists) {
      this.errors.push(`Method '${this.methodName}' not found in controller '${this.controllerName}'`);
      return false;
    }

    return true;
  }
}

module.exports = Application;
