const winston = require("winston");
const config = require("config");
const { combine, timestamp, json, errors } = winston.format;

const level = config.get("logging.level");
const stack = config.get("logging.trace");

const logger = winston.createLogger({
  level,
  format: combine(errors({ stack }), timestamp(), json()),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
