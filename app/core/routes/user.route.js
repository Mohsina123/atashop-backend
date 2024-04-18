const { Router } = require('express');

const UsersController = require('../controllers/users.controller');


const authenticate = require('./../middleware/authenticate');

const routes = new Router();

routes.route('/')
    .post(UsersController.create)
    .get(authenticate, UsersController.search);

routes.route('/:id')
    .get(authenticate, UsersController._populate, UsersController.fetch)
    .put(authenticate, UsersController._populate, UsersController.update)
    .delete(authenticate, UsersController._populate, UsersController.delete);
routes.route('/apikey/:id')
    .get(authenticate, UsersController._populate, UsersController.fetchApiKey)
    .post(authenticate, UsersController._populate, UsersController.reGenerateApiKey)



module.exports = routes;
