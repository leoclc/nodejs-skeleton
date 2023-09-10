import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { LOG_DIR } from '@config';
import Context from '@/middlewares/context.middleware';
import { REQUEST_ID_HEADER_NAME } from '@/app';
const continuation = require('cls-hooked');

// logs dir
const logDir: string = join(__dirname, LOG_DIR);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const winstonLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    // debug log setting
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/debug', // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true,
    }),
    // error log setting
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

const formatMessage = function(message) {
  let requestId
  if(Context.setupWasCalled) {
    requestId = continuation.getNamespace('requestNamespace').get('context').headers[REQUEST_ID_HEADER_NAME]
  }
  message = requestId && requestId ? requestId +' '+ message : message;
  return message;
};

winstonLogger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
  }),
);

const stream = {
  write: (message: string) => {
    winstonLogger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

const logger = {
  log: function(level, message) {
      winstonLogger.log(level, formatMessage(message));
  },
  error: function(message) {
      winstonLogger.error(formatMessage(message));
  },
  warn: function(message) {
      winstonLogger.warn(formatMessage(message));
  },
  verbose: function(message) {
      winstonLogger.verbose(formatMessage(message));
  },
  info: function(message) {
      winstonLogger.info(formatMessage(message));
  },
  debug: function(message) {
      winstonLogger.debug(formatMessage(message));
  },
  silly: function(message) {
      winstonLogger.silly(formatMessage(message));
  }
};

export { logger, stream };
