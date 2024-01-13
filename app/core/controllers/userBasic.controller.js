const { userBasicService } = require('../services/userBasic.Service');
const { userBasicRepository } = require('../repo/userBasicRepo');
const userBasic = require('../models/userBasic');
const UserBasicRepository = new userBasicRepository(userBasic);
const UserBasicService = new userBasicService(
  UserBasicRepository
);

/**
 * @public this function is used to create users account
 */
exports.create = async (req, res, next) => {
  try {
    const response = await UserBasicService.create(req);
    res.status(200).send(response);
  } catch (error) {
    next(Error);
  }
};

/**
 * @private   this function is used to get all users
 */
exports.fetchAll = async (req, res, next) => {
  try {
    const response = await UserBasicService.fetchAll(req);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * @private this function is used to fetch user
 */
 exports.fetch = async (req, res, next) => {
  try {
    const response = await UserBasicService.fetch(req.params);
    res.json(response);
  } catch (error) {
    next(Error);
  }
};

/**
 * @public this function used for login users
 * @return access Token 
 */
exports.login = async (req, res, next) => {
  try {
    const response = await UserBasicService.login(req.body);
    res.json(response);
  } catch (error) {
    next(Error);
  }
};

/** 
 * @private this function used to delete a user
 */
exports.delete = async (req, res, next) => {
  try {
    const response = UserBasicService.delete(req.params);
    res.status(200).send(response);
  } catch (error) {
    next(Error);
  }
};

/** 
 * @private this function used to update a user
 */
exports.update = async (req, res, next) => {
  try {
    const response = await UserBasicService.update(req.body, req.params);
    res.status(200).send(response);
  } catch (error) {
    next(Error);
  }
};

/**   
 * @private this function used for generate pdf files
 */
exports.generateReceipt= async (req, res, next) => {
  try {
    const response = await UserBasicService.generateReceipt(req.params);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

/**   
 *  @private this function used for sending mail.
 */
exports.sendCredentialsMail= async (req, res, next) => {
  try {
    const response = await UserBasicService.sendCredentialsMail(req.params);
    res.status(200).send(response);
  } catch (error) {
    next(Error);
  }
};


