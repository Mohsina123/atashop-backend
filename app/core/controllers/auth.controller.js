const BaseController = require('./base.controller');
const User = require('../models/user');
const LogsController =require('./logs.controller');
class AuthController extends BaseController {
  login = async (req, res, next) => {
    const {
      email,
      password,
    } = req.body;

    try {
      const user = await User.findOne({
        email: email,
      }).exec();

      if (!user || !user.authenticate(password)) {
        LogsController.write({
          eventName: 'LOGIN',
          ip: LogsController.extractIp(req),
          message: `failed login attempt for ${email}`,
          level: 3,
        });

        const err = new Error('Please verify your credentials.');
        err.status = 401;
        return next(err);
      }

      if (user.isBlocked) {
        const err = new Error('The IDS has detected an abnormality with your access and has blocked it as a precaution. Please contact the Helpdesk.');
        err.status = 403;
        return next(err);
      }

      const accessToken = user.generateToken();
      LogsController.write({
        eventName: 'LOGIN',
        ip: LogsController.extractIp(req),
        message: `Successful login attempt for ${email}`,
        level: 3,
        user: user._id,
      });
      return res.status(200).json({
        accessToken,
        user,
        isSuccess:true,
      });
    } catch (err) {
      console.log(err);
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

 
}

module.exports = new AuthController();
