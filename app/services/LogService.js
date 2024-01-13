// const appRoot = require("app-root-path");
// const { info } = require("winston");
const winston = require("winston");

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: "info",
    filename: './logs/info.log',
    
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
};

const error = {
  file: {
    level: "error",
    filename: './logs/error.log',
    
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
};

// instantiate a new Winston Logger with the settings defined above
const information = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console), 
  ],
  exitOnError: false, // do not exit on handled exceptions
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(error.file),
    new winston.transports.Console(error.console),  
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write: function (message, encoding) {
    
    // use the 'info' log level so the output will be picked up by both
    // transports (file and console);
    information.info(message);
  },
};

// create a stream object with a 'write' function that will be used by `morgan`
information.stream = {
  write: function (message, encoding) {
    
    // use the 'info' log level so the output will be picked up by both
    // transports (file and console);
    information.info(message);
  },
};

module.exports = logger;