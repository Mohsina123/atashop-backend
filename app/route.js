const { Router } = require('express');
const routes = new Router();
const userBasicRoutes =require ('./core/routes/userBasic.route');
const errorHandler = require('./core/middleware/error-handler');

/**
 * @route route is use to handle crud operations of the products
 * and particulers products route is define below
 */

// userBasics
routes.use('/userBasics', userBasicRoutes);
routes.use(errorHandler);

module.exports = routes; 