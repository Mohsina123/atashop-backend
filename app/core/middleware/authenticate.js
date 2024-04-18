const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Constants = require('../../config/constants');


const {
  sessionSecret,
} = Constants.security;

module.exports = function authenticate(req, res, next) {
  let authorization;
  // console.log('req heders authorization==>',req.headers.authorization)

  // get jwt token from header
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    authorization = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    authorization = req.query.token;
  }

  jwt.verify(authorization, sessionSecret, async (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }

    // If token is decoded successfully, find employee and attach to our request
    // for use in our route or other middleware
    try {
      let user = null;

      user = await User.findById(decoded._id).exec();


      if (!user) {
        return res.sendStatus(401);
      }

      req.currentUser = user;

      next();
    } catch (err) {
      next(err);
    }
  });
}