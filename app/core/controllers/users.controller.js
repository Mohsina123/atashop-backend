const BaseController = require('./base.controller');
const User = require('../models/user');
const randomize = require('randomatic');
const fs = require('fs-extra');

const util = require('util');
require('util.promisify').shim();
const removeFile = util.promisify(fs.unlink);

class UsersController extends BaseController {
	whitelist = [
		'password',
		'name',
		'place',
		'email',
		'phone',
		'address',
		'role',
		'apiKey',
	];

	whitelisttype = [
		'customer',
		'admin'
	]

	_populate = async (req, res, next) => {
		if (req.params.id && req.params.id != 'newuser') {
			const {
				id,
			} = req.params;

			try {
				const user = await
					User.findById(id).exec();

				if (!user) {
					const err = new Error('User not found.');
					err.status = 404;
					return next(err);
				}
				req.user = user;
				next();
			} catch (err) {
				console.log(err);
				next(err);
			}
		} else {
			next();
		}
	}

	search = async (req, res, next) => {
		let filter = {};
		let sort = {};

		if (req.query.sort && req.query.key) {
			sort = {
				[req.query.key]: [req.query.sort],
			};
		}

		if (req.query.filter) {
			filter['$or'] = [];
			filter['$or'].push({
				'sergeonName': {
					'$regex': req.query.filter,
					'$options': 'i',
				},
			});
			filter['$or'].push({
				'clinic': {
					'$regex': req.query.filter,
					'$options': 'i',
				},
			});
		}

		try {

			const [results, itemCount] = await Promise.all([
				User.find(filter).sort(sort).limit(req.query.limit).skip(req.skip).exec(),
				User.countDocuments(filter),
			]);

			const pageCount = Math.ceil(itemCount / req.query.limit);

			res.json({
				object: 'list',
				page: {
					...req.query,
					totalPages: pageCount,
					totalElements: itemCount,
				},
				data: results,
				isSuccess: true,
			});

		} catch (err) {
			next(err);
		}
	}

	fetch = async (req, res) => {
		const user = req.user || req.currentEmployee;

		if (!user) {
			return res.sendStatus(404);
		}

		res.json(user);
	}

	create = async (req, res, next) => {
		try {
			const filter = req.body;

			if (!filter.role) {
				filter.role = 'customer';
			}

			if (!filter.password) {
				filter.password = "#atashop123"
			}
			


			const params = this.filterParams(filter, this.whitelist);
			let newUser = new User({
				...params,
				password: filter.password,
				type: filter.type,
				provider: 'local'
			});
			// console.log('newUser==>', newUser)
			let savedUser = await newUser.save();



			res.status(201)
				.json(await savedUser.save());
		} catch (err) {
			if (err)
				err.status = 400;
			next(err);
		}
	}

	update = async (req, res, next) => {
		let user = req.body;
		let updatedUser = Object.assign(req.user, user);
		try {
			res.status(200).json(await updatedUser.save());
		} catch (err) {
			next(err);
		}
	}

	delete = async (req, res, next) => {
		if (!req.user) {
			return res.sendStatus(403);
		}
		try {
			await req.user.remove();
			res.json({
				isSuccess: true,
			});
		} catch (err) {
			next(err);
		}
	}
	fetchApiKey = async (req, res, next) => {
		let apikey;
		let user = req.user;

		try {
			if (!user.apiKey) {
				apikey = randomize('Aa0', 40);
				user.apiKey = apikey;
				res.status(200).json(await user.save());

			}else {
				res.status(200).json(req.user);
			}
		} catch (err) {
			next(err);
		}
	}

	reGenerateApiKey = async (req, res, next) => {
		try {
			let apikey;
			let user = req.user;
			apikey = randomize('Aa0', 40);
			user.apiKey = apikey;
			res.status(200).json(await user.save());
		} catch (err) {
			next(err);
		}

	}



}
module.exports = new UsersController();
