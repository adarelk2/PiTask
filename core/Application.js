const Controller = require('./Controller');

class Application {
  constructor(req, res) {
    this.req = req;
    this.res = res;

    this.controllerName = (req.params.controller || 'home').toLowerCase();
    this.methodName = req.query.method || req.body.method || 'print';
    this.params = req.query.params || req.body.params || {};
    this.errors = [];

    this.controllerLoader = new Controller(req, res);
  }

  init = () => {
    if (!this.isValidRequest()) {
      console.error("❌ Request is not valid:", this.errors);
      return this.res.status(500).render('error', { errors: this.errors });
    }

    try {
      const controllerInstance = this.controllerLoader.getController(this.controllerName);

      const method = controllerInstance[this.methodName];
      if (typeof method === 'function') {
        method.call(controllerInstance, this.params);
      } else {
        throw new Error(`Method '${this.methodName}' not found on controller '${this.controllerName}'`);
      }

    } catch (err) {
      console.error("❌ Exception during controller execution:", err);
      this.res.status(500).render('error', {
        errors: [`Internal Error: ${err.message}`]
      });
    }
  }

  isValidRequest = () => {
    const exists = this.controllerLoader.isControllerExist(this.controllerName);
    if (!exists) {
      this.errors.push(`Error 444 - '${this.controllerName}' not found`);
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
