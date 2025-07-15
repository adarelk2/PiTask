const View = require('./View');

class BaseController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.view = new View(res);
    this.user = req.user || null;

    let lang_errors = "en";
    if("lang" in this.req.body)
      lang_errors = this.req.body.lang;
     this.errors = require(`../constants/errors_${lang_errors}`);
  }

  render(viewName, context = {}) {
    this.res.render(viewName, context);
  }

  print()
  {
    this.render('error', {errors:["print method doesn't exist"]});
  }

  json(data) {
    this.res.setHeader('Content-Type', 'application/json');
    this.res.end(JSON.stringify(data));
  }

  redirect(path) {
    this.res.redirect(path);
  }
}

module.exports = BaseController;
