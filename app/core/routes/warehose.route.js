const { Router } = require('express');

const WareHouseController = require('../controllers/warehouses.controller');


const authenticate = require('./../middleware/authenticate');

const routes = new Router();

routes.route('/')
    .post(authenticate,WareHouseController.create)
    .get(authenticate, WareHouseController.search);

routes.route('/:id')
    .get(authenticate, WareHouseController._populate, WareHouseController.fetch)
    .put(authenticate, WareHouseController._populate, WareHouseController.update)
    .delete(authenticate, WareHouseController._populate, WareHouseController.delete);

module.exports = routes;