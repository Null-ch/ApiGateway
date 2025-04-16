const { createLogger, format, transports } = require('winston');
require('dotenv').config();

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: process.env.LOG_FILE_PATH }),
    new transports.Console()
  ]
});

module.exports = logger; 