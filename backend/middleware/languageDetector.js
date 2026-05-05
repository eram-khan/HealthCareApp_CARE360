const detectLanguage = (req, res, next) => {
  // 1. Check custom header (sent by frontend based on localStorage)
  // 2. Check query parameter (optional, e.g., ?lng=hi)
  // 3. Fallback to Accept-Language header
  // 4. Ultimate fallback to 'en'

  const supportedLanguages = ['en', 'hi', 'bn'];
  let lang = req.headers['x-app-language'] || req.query.lng || req.acceptsLanguages(supportedLanguages) || 'en';

  // Ensure selected language is supported
  if (!supportedLanguages.includes(lang)) {
    lang = 'en';
  }

  req.language = lang; // Attach to request object
  next();
};

module.exports = detectLanguage;
