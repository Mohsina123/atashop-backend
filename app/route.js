const { Router } = require('express');
const routes = new Router();
const OrderRoutes =require ('./core/routes/order.route');
const errorHandler = require('./core/middleware/error-handler');

/**
 * @route route is use to handle crud operations of the products
 * and particulers products route is define below
 */

// Orders
routes.use('/orders', OrderRoutes);
// users routes
routes.use('/user', OrderRoutes);
routes.use(errorHandler);

module.exports = routes; 