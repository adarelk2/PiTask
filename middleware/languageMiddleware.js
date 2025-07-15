const i18n = require('i18n');

function languageMiddleware(req, res, next) {
  // זיהוי שפה מה-query או מה-body
  const lang = req.query.lang || req.body.lang || 'he';
  req.setLocale(lang); // מגדיר את השפה עבור i18n
  res.locals.lang = lang; // שיהיה זמין גם בתבניות hbs
  next();
}

module.exports = languageMiddleware;
