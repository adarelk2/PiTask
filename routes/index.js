const express = require('express');
const router = express.Router();
const Application = require('../core/Application');
const languageMiddleware = require('../middleware/languageMiddleware'); // ✅ חדש
const requireAuth = require('../middleware/auth'); // ✅ חדש


// ✅ הראוטר הראשי
router.get('/:controller?', languageMiddleware, requireAuth, (req, res) => {
  const app = new Application(req, res);
  app.init();
});

router.post('/:controller?',languageMiddleware, requireAuth, (req, res) => {
  const app = new Application(req, res);
  app.init();
});
module.exports = router;
