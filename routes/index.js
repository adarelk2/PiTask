const express = require('express');
const router = express.Router();
const Application = require('../core/Application');

// Handles '/' and '/:controller'
router.get('/:controller?', (req, res) => {
  const app = new Application(req, res);
  app.init();
});

module.exports = router;
