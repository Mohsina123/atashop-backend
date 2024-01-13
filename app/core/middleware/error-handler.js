const Constants =require ('../../config/constants');
const winston = require('../../services/LogService');

/** 
 * @error This function is used when an eroor happen in backend-demo'
 * @route
 */

module.exports= function errorHandler(err, req, res, next) {
  if (!err) {
    return res.sendStatus(500);
  }

  const error = {
    code:500,
    message: err.message || 'Internal Server Error.',
  };
  
  if (Constants.envs.development) {
    error.userBasic = err.stack;
  }

  if (err.errors) {
    error.errors = {};
    const { errors } = err;
    for (const type in errors) {
      if (type in errors) {
        error.errors[type] = errors[type].message;
      }
    }
  }
  
  // include winston logging
  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );

  res.status(err.status || 500).json(error);
}
