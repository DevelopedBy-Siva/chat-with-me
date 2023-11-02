const config = require("config");

// A workaround to fix empty vercel config

module.exports = {
  APP_NAME: config.get("APP_NAME") || process.env.APP_NAME,
  CLIENT_URL: config.get("CLIENT_URL") || process.env.CLIENT_URL,
  DB_URL: config.get("DB_URL") || process.env.DB_URL,
  SECRET_KEY: config.get("SECRET_KEY") || process.env.SECRET_KEY,
  PORT: config.get("PORT") || process.env.PORT,
  MAIL_SERVICE_PROVIDER: config.get("MAIL_SERVICE_PROVIDER") || "gmail",
  MAIL_SERVICE_USER: config.get("MAIL_SERVICE_USER") || process.env.MAIL_ID,
  MAIL_SERVICE_PASSWORD:
    config.get("MAIL_SERVICE_PASSWORD") || process.env.MAIL_PASSWORD,
  CLEANUP_OLDER_MSGS: config.get("CLEANUP_OLDER_MSGS") || "1",
  HTTP_COOKIE_EXPIRY: config.get("HTTP_COOKIE_EXPIRY") || 2,
  JWT_EXPIRY: config.get("JWT_EXPIRY") || "2d",
  VERIFY_CODE_EXPIRY: config.get("VERIFY_CODE_EXPIRY") || 300,
  LOGGING_LEVEL: config.get("LOGGING_LEVEL") || "info",
  LOGGING_LEVEL_TRACE: config.get("LOGGING_LEVEL_TRACE") || true,
};
