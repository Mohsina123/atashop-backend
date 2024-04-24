const BaseController = require('./base.controller');
const Warehouse =require('../models/warehouse');

class WarehousesController extends BaseController {

  whitelist = [
    'name',
    'contactPersonName',
    'contactCode',
    'contactNo',
    'gstNo',
    'warehouseAddress',
    'state',
		'postcode',
		'city',
		'country',
    'email',
    'supportPhone',
    'isDefault',
    'user',
  ];

  // Middleware to populate warehouse based on url param
  _populate = async (req, res, next) => {
    const {
      id,
    } = req.params;

    try {
      const warehouse = await Warehouse.findById(id).populate('permissions');

      if (!warehouse) {
        const err = new Error('Warehouse not found.');
        err.status = 404;
        return next(err);
      }

      req.warehouse = warehouse;
      next();
    } catch (err) {
      err.status = err.name === 'CastError' ? 404 : 500;
      next(err);
    }
  }

  search = async (req, res, next) => {
   // console.log('ok');
    let filter = {};
    if (req.query.filter) {
      filter.bearingDesignation = {
        '$regex': req.query.filter,
        '$options': 'i',
      };
    }

 
    try {
      const [results, itemCount] = await Promise.all([
        Warehouse.find(filter).sort({ warehouseID: 1 }).exec(),
        Warehouse.countDocuments({}),
      ]);

      const pageCount = Math.ceil(itemCount / req.query.limit);

      res.json({
        object: 'list',
        page: {
          totalPages: pageCount,
          totalElements: itemCount,
          size: req.query.limit,
          pageNumber: req.query.page,
          filter: req.query.filter,
        },
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }

  fetchAll = async (req, res, next) => {
    try {
      let filter = {};

      if (req.query.name) {
        filter['name'] = req.query.name;
      }

      const warehouses = await Warehouse.find(filter).sort({ order: 1 });
      res.json(warehouses);
    } catch (err) {
      next(err);
    }
  }


  /**
   * req.warehouse is populated by middleware in routes.js
   */

  fetch = (req, res) => {
    res.json(req.warehouse);
  }

  /**
   * req.user is populated by middleware in routes.js
   */

  create = async (req, res, next) => {
    const params = this.filterParams(req.body, this.whitelist);
    const warehouse = new Warehouse({
      ...params,
      user:req.currentUser,
    });

    try {
      res.status(201).json(await warehouse.save(function(err) {
        console.log(err);
      }));
    } catch (err) {
      console.log('err', err);
      next(err);
    }
  }

  delete = async (req, res, next) => {
    /**
     * Ensure the user attempting to delete the cleaning type owns the cleaning type
     *
     * ~~ toString() converts objectIds to normal strings
     */
    try {
      await req.warehouse.remove();
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  update = async (req, res) => {
    let updatedWarehouse = Object.assign(req.warehouse, req.body);
    res.status(200).json(await updatedWarehouse.save());
  }
}

module.exports = new WarehousesController();
