const express = require('express');
const router = express.Router();
const Application = require('../core/Application');

// Handles '/' and '/:controller'
router.get('/:controller?', (req, res) => {
  console.log("test");
  // res.send("gfdgfd");
  res.render("test", {title:"test"});

  // const app = new Application(req, res);
  // app.init();
});

module.exports = router;
