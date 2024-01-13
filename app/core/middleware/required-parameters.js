
const { REQUIRED_PARAMETERS } = require("../routes-constants/routesParamsCheck");

/**
 *  @checkRequestParams is used to check either required data is provided or not provided 
 * if required data is not provided then it returns error message that this data is required
 */
const checkRequestParams = async (req, res, next) => {
  try {
    let requestDataBody;
    const url = req.method + '_' + req.baseUrl + req.route.path;
    let message = '';
    if(Object.keys(req.body).length==0 && Object.keys(req.params).length==0){
      paramsArray = REQUIRED_PARAMETERS[url + ''].body;
    } else {
      if (req.method == 'GET' || req.method == 'DELETE') {
        paramsArray = REQUIRED_PARAMETERS[url + ''].params;
        if (Object.keys(req.body).length!==0) {
          requestDataBody = req.body;
          paramsArray = REQUIRED_PARAMETERS[url + ''].body;
          message = await getErrorMessage(paramsArray, requestDataBody, message);
        }
        requestDataBody = req.params;
      } else {
        requestDataBody = req.body;
        paramsArray = REQUIRED_PARAMETERS[url + ''].body;
      }
      message = await getErrorMessage(paramsArray, requestDataBody, message);
    }
    if (message) {
      res.status(400).json({
        message: message,
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

/**
 * Get ERROR message
 */
var getErrorMessage = function (paramsArray, paramsToBeChecked, message) {
  paramsArray.forEach(function (param) {
    if (paramsToBeChecked[param.name] == undefined) {
      message += (message ? '\n ' : '') + param.name + ' parameter missing';
    } else {
      if (param.type && typeof paramsToBeChecked[param.name] !== param.type) {
        message += (message ? '\n' : '') + param.name + ' parameter invalid, ' + param.type + ' is required';
      }
    }
  });

  return message;
};

module.exports = { checkRequestParams };