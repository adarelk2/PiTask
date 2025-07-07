class View {
    constructor(res) {
      this.res = res;
    }
  
    render(viewName, data = {}) {
      this.res.render(viewName, data);
    }
  
    error(errors = []) {
      this.res.status(500).render('error', { errors });
    }
  }
  
  module.exports = View;
  