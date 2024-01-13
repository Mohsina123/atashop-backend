const jwt = require("jsonwebtoken");
const User = require('../models/userBasic');
const { userBasicRepository } = require('../repo/userBasicRepo');
const UserRepository = new userBasicRepository(User);
const Constants = require('../../config/constants');

const { sessionSecret } = Constants.security;

module.exports = function authenticate(req, res, next) {
  const { authorization } = req.headers;
  // get jwt token from header

  jwt.verify(authorization, sessionSecret, async (err, decoded) => {

    if (err) {
      return res.sendStatus(401);
    }
    // If token is decoded successfully, find userbasic and attach to our request
    // for use in our route or other middleware
    try {
      let userBasic = null;
      if (decoded) {
        userBasic = await UserRepository._populate(decoded._id)
      }

      if (!userBasic) {
        return res.sendStatus(401);
      }
      req.currentuserBasic = userBasic;
      next();
    } catch (err) {
      next(err);
    }
  });
}