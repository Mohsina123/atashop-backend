const { Router } = require('express');

const OrdersController = require ('../controllers/orders.controller');

const routes = new Router();

routes.route('/')
    .post( OrdersController.create)
    .get( OrdersController.search);

routes.route('/:id')
    .get( OrdersController._populate, OrdersController.fetch)
    .put( OrdersController._populate, OrdersController.update)
    .delete( OrdersController._populate, OrdersController.delete);



module.exports = routes;