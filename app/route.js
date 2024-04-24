const { Router } = require('express');
const routes = new Router();
const OrderRoutes =require ('./core/routes/order.route');
const UserRoutes =require ('./core/routes/user.route');
const AuthRoutes= require ('./core/routes/auth.route');
const WarehouseRoutes= require ('./core/routes/warehose.route');

const errorHandler = require('./core/middleware/error-handler');

/**
 * @route route is use to handle crud operations of the products
 * and particulers products route is define below
 */

// Authentication
routes.use('/auth', AuthRoutes);

// Orders
routes.use('/orders', OrderRoutes);
// users routes
routes.use('/user', UserRoutes);
// users routes
routes.use('/warehouses', WarehouseRoutes);

routes.use(errorHandler);

module.exports = routes; 