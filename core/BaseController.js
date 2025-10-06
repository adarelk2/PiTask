class BaseController 
{
  constructor(req, res) 
  {
    this.req = req;
    this.res = res;
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

  checkPermissions(_levelRequire, _childClass) 
  {
    if (!this.req.user || this.req.user.level < _levelRequire) 
    {
      const ownProps = Object.getOwnPropertyNames(_childClass.prototype);

      for (const prop of ownProps) 
      {
        if (prop !== 'constructor') 
          this[prop] = () => {
            throw new Error('Access denied: insufficient level');
          };
      }
    }
  }
}

module.exports = BaseController;
