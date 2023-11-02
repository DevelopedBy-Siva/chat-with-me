const config = require("config");

// A workaround to fix empty vercel config

function getConfig(key, value = null) {
  try {
    if (Object.keys(config).length !== 0) return config.get(key);
  } catch (_) {}
  return value ? value : process.env[key];
}

module.exports = {
  APP_NAME: getConfig("APP_NAME"),
  CLIENT_URL: getConfig("CLIENT_URL"),
  DB_URL: getConfig("DB_URL"),
  SECRET_KEY: getConfig("SECRET_KEY"),
  PORT: getConfig("PORT"),
  MAIL_SERVICE_PROVIDER: getConfig("MAIL_SERVICE_PROVIDER", "gmail"),
  MAIL_SERVICE_USER: getConfig("MAIL_ID"),
  MAIL_SERVICE_PASSWORD: getConfig("MAIL_PASSWORD"),
  CLEANUP_OLDER_MSGS: getConfig("CLEANUP_OLDER_MSGS", "1"),
  HTTP_COOKIE_EXPIRY: getConfig("HTTP_COOKIE_EXPIRY", 2),
  JWT_EXPIRY: getConfig("JWT_EXPIRY", "2d"),
  VERIFY_CODE_EXPIRY: getConfig("VERIFY_CODE_EXPIRY", 300),
  LOGGING_LEVEL: getConfig("LOGGING_LEVEL", "info"),
  LOGGING_LEVEL_TRACE: getConfig("LOGGING_LEVEL_TRACE", true),
};
