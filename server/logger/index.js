const winston = require("winston");
const config = require("../utils/config");
const { combine, timestamp, json, errors } = winston.format;

const level = config.LOGGING_LEVEL;
const stack = config.LOGGING_LEVEL_TRACE;

const logger = winston.createLogger({
  level,
  format: combine(errors({ stack }), timestamp(), json()),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
