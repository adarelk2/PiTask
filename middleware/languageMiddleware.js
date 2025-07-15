const i18n = require('i18n');

function languageMiddleware(req, res, next) {
  // זיהוי שפה מתוך query או body, ברירת מחדל 'he'
  const lang = req.query.lang || req.body.lang || 'he';
  // אם השפה קיימת ברשימת השפות המוגדרות
  if (i18n.getLocales().includes(lang)) {
    req.setLocale(lang); // מגדיר את השפה
    res.locals.lang = lang;
    res.locals.dir = i18n.__({ phrase: 'dir', locale: lang }); // גם כיוון טקסט
  } else {
    req.setLocale('en');
    res.locals.lang = 'en';
    res.locals.dir = 'ltr';
  }

  next();
}
module.exports = languageMiddleware;
