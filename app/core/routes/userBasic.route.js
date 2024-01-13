const express = require('express');
const routes = express.Router();
const authenticate = require('../middleware/authenticate');
const userBasicsController = require('../controllers/userBasic.controller');
const { checkRequestParams } = require('../middleware/required-parameters');

routes.route('/')
    .post(checkRequestParams, userBasicsController.create)
    .get(checkRequestParams,  userBasicsController.fetchAll);

routes.route('/login')
    .post(checkRequestParams, userBasicsController.login);

routes.route('/:id')
    .get(checkRequestParams,  userBasicsController.fetch)
    .put(checkRequestParams,  userBasicsController.update)
    .delete(checkRequestParams,  userBasicsController.delete);

routes.route('/:id/receipt')
    .get(checkRequestParams,  userBasicsController.generateReceipt);

routes.route('/send-email/:id')
    .get(checkRequestParams,  userBasicsController.sendCredentialsMail);

module.exports = routes;