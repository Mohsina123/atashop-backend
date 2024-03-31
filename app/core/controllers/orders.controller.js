const BaseController = require('./base.controller');
const Order = require('../models/orders');


class OrdersController extends BaseController {
	whitelist = [
		'customerOrderNumber',
		'paymentType',
		'orderType',
		'shipmentType',
		'customer',
		'customer2',
		'billingAddressSameAsShippingAddress',
		'productInformation',
		'weight',
		'length',
		'breadth',
		'height',
		'volumetricWeight',
		'invoiceAmount',
		'totalAmount',
		'reSellerName',
		'orderDate',
		'channel',
		'storeName',
		'status',
		'amount',
		'productName',
		'quantity',
		'orderCreater',
		'pickupAddress',
		'deliveryAddress',
		
	];

	_populate = async (req, res, next) => {
		const {
			id,
		} = req.params;

		try {
			const order = await Order.findById(id)
				.exec();

			if (!order) {
				const err = new Error('Order not found.');
				err.status = 404;
				return next(err);
			}

			req.order = order;
			next();
		} catch (err) {
			next(err);
		}
	}

	create = async (req, res, next) => {
		try {
			const params = this.filterParams(req.body, this.whitelist);
			const order = new Order({
				...params,
			});
			res.status(201).json(await order.save());
		} catch (err) {
			next(err);
			console.log(err);
		}
	}

	search = async (req, res, next) => {
		let filter = {};

		try {
			const [results, itemCount,] = await Promise.all([
				Order
					.find(filter)
					.sort(sort)
					.exec(),
				Order.countDocuments(filter),

			]);
			const pageCount = Math.ceil(itemCount / req.query.limit);
			res.json({
				order: 'list',
				page: {
					...req.query,
					totalPages: pageCount,
					totalElements: itemCount,
				},
				data: results,
			});
		} catch (err) {
			next(err);
		}
	}

	fetch = async (req, res) => {
		const order = req.order;
		if (!order) {
			return res.sendStatus(404);
		}

		res.json(order);
	}

	update = async (req, res, next) => {
		let order = req.body;
		let updatedOrder = Object.assign(req.order, order);
		try {
			res.status(200).json(await updatedOrder.save());
		} catch (err) {
			next(err);
		}
	}

	delete = async (req, res, next) => {
		if (!req.order) {
			return res.sendStatus(403);
		}

		try {
			await req.order.remove();
			res.sendStatus(204);
		} catch (err) {
			next(err);
		}
	}


}

module.exports = new OrdersController();
