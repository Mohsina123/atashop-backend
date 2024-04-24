const { Router } = require('express');

const OrdersController = require('../controllers/orders.controller');

const authenticate = require('./../middleware/authenticate');


const routes = new Router();

routes.route('/')
    .post(authenticate, OrdersController.create)
    .get(authenticate, OrdersController.search);

routes.route('/:id')
    .get(authenticate, OrdersController._populate, OrdersController.fetch)
    .put(authenticate, OrdersController._populate, OrdersController.update)
    .delete(authenticate, OrdersController._populate, OrdersController.delete);



module.exports = routes;