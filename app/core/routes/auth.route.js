const { Router } = require('express');

const AuthController = require ('../controllers/auth.controller');


const routes = new Router();

routes.route('/login').post(AuthController.login);
module.exports = routes;