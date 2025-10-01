const express = require('express');
const router = express.Router();
const Application = require('../core/Application');
const languageMiddleware = require('../middleware/languageMiddleware'); // ✅ חדש
const requireAuth = require('../middleware/auth'); // ✅ חדש
const Logger = require('../core/Logger');

const logger = new Logger("logs", 100000);

// ✅ הראוטר הראשי
router.get('/:controller?', languageMiddleware, requireAuth, async(req, res) => {
  const app = await new Application(req, res, logger);
  app.init();
});

router.post('/:controller?',languageMiddleware, requireAuth, (req, res) => {
  const app = new Application(req, res, logger);
  app.init();
});
module.exports = router;
