import BaseController from './base.controller';
import Employee from '../models/employee';
import LogsController from './logs.controller';
import Customer from '../models/customer';
import { sendEmployeePasswordCredentials,sendCustomerPasswordCredentials } from '../shared/send-mail';
class AuthController extends BaseController {
  login = async (req, res, next) => {
    const {
      userID,
      password,
    } = req.body;

    try {
      const employee = await Employee.findOne({
        userID: userID,
      }).exec();

      if (!employee || !employee.authenticate(password)) {
        LogsController.write({
          eventName: 'LOGIN',
          ip: LogsController.extractIp(req),
          message: `failed login attempt for ${userID}`,
          level: 3,
        });

        const err = new Error('Please verify your credentials.');
        err.status = 401;
        return next(err);
      }

      if (employee.isBlocked) {
        const err = new Error('The IDS has detected an abnormality with your access and has blocked it as a precaution. Please contact the Helpdesk.');
        err.status = 403;
        return next(err);
      }

      const accessToken = employee.generateToken();
      LogsController.write({
        eventName: 'LOGIN',
        ip: LogsController.extractIp(req),
        message: `Successful login attempt for ${userID}`,
        level: 3,
        employee: employee._id,
      });
      return res.status(200).json({
        accessToken,
        employee,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  customerLogin = async (req, res, next) => {
    const {
      customerID,
      password,
    } = req.body;

    try {
      let filter = {};
      if(isNaN(customerID)) {
        filter['email'] = customerID;
      } else {
        filter['customerID'] = customerID;
      }

      const customer = await Customer.findOne(filter).exec();
      if (!customer || !customer.authenticate(password)) {
        LogsController.write({
          eventName: 'CUSTOMER LOGIN',
          ip: LogsController.extractIp(req),
          message: `failed login attempt for ${customerID}`,
          level: 3,
        });

        const err = new Error('Please verify your credentials.');
        err.status = 401;
        return next(err);
      }

      if (customer.isBlocked) {
        const err = new Error('The IDS has detected an abnormality with your access and has blocked it as a precaution. Please contact the Helpdesk.');
        err.status = 403;
        return next(err);
      }

      const accessToken = customer.generateToken();
      LogsController.write({
        eventName: 'CUSTOMER LOGIN',
        ip: LogsController.extractIp(req),
        message: `Successful login attempt for ${customerID}`,
        level: 3,
        customer: customer._id,
      });

      return res.status(200).json({
        accessToken,
        customer,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  _populate = async (req, res, next) => {
		if (req.params.id && req.params.id != 'newuser') {
			const {
				id,
			} = req.params;

			try {
				const user = await
					Employee.findById(id).exec();
        
        // if(!user){
        //  user = await Customer.findById(id).exec(); 
        // }

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


  update = async (req, res, next) => {
		let user = req.body;
		let updatedUser = Object.assign(req.user, user);
		try {
			res.status(200).json(await updatedUser.save());
		} catch (err) {
			next(err);
		}
	}
  updateCustomer = async (req, res, next) => {
		let customer = req.body;
		let updatedUser = Object.assign(req.customer, customer);
		try {
			res.status(200).json(await updatedUser.save());
		} catch (err) {
			next(err);
		}
	}


  findByEmail = async (req, res, next) => {
		let email = req.body.email;
		try {
			let user = await Employee.find({email:email}).exec();
			if (!user.length) {
				const err = new Error('User not found.');
				err.status = 404;
				return next(err);
			}
			req.user = user;
			await sendEmployeePasswordCredentials(user,user.password)
			res.json(user);
		} catch (err) {
			console.log(err);
			next(err);
		}

	}

  
  findCustomerByEmail = async (req, res, next) => {
		let email = req.body.email;
		try {
			let user = await Customer.find({email:email}).exec();
			if (!user.length) {
				const err = new Error('User not found.');
				err.status = 404;
				return next(err);
			}
      // console.log('user==>',user);
			req.user = user;
			await sendCustomerPasswordCredentials(user,user.password)
			res.json(user);
		} catch (err) {
			console.log(err);
			next(err);
		}

	}
}

export default new AuthController();
