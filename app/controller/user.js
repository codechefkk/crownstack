// import collections
const { Users, UserToken } = require('../models');

// import helpers
const baseHelper = require('../utils/base');

class UserController {
  constructor() {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  /**
   * @api {post} /user/register To register a user
   * @apiName User
   * @apiGroup Crownstack
   *
   * @apiParam {String} firstName First name of user.
   * @apiParam {String} lastName Last name of user.
   * @apiParam {String} email Email of user.
   * @apiParam {String} password Password of user.
   *
   * @apiSuccess {String} status ok.
   * @apiSuccess {String} data Mongo Id of registered user as string.
   *
   * @apiSuccessExample Success-Response:
   *     {
   *       'status': 'ok',
   *       'data': id
   *     }
   *
   * @apiError InvalidRequest Invalid Request.
   *
   * @apiErrorExample Error-Response:
   *     {
   *       'status':'error',
   *       'error': message
   *     }
   */
  async register(req, res) {
    try {
      baseHelper.log("Inside User Register");

      const requiredFields = ["firstName", "email", "password"];
      baseHelper.validateRequired(req.body, requiredFields);

      const data = baseHelper.trimData(req.body);

      const { firstName, lastName = '', email: userEmail, password } = data;

      const email = userEmail.toLowerCase();

      const registeredUser = await Users.create({
        firstName,
        lastName,
        email: {
          address: email,
          verified: true,
        },
        password: baseHelper.setPassword(password),
      });

      baseHelper.log(`Registered User ${registeredUser.id}`)
      return baseHelper.response(res, baseHelper.success(registeredUser.id));
    } catch (err) {
      baseHelper.warn(err.message);
      return baseHelper.response(res, baseHelper.error(err.message), 422);
    }
  }

  /**
   * @api {post} /user/login To login a user
   * @apiName User
   * @apiGroup Crownstack
   *
   * @apiParam {String} email Email of user.
   * @apiParam {String} password Password of user.
   *
   * @apiSuccess {String} status ok.
   * @apiSuccess {String} data User token.
   *
   * @apiSuccessExample Success-Response:
   *     {
   *       'status': 'ok',
   *       'data': token
   *     }
   *
   * @apiError InvalidRequest Invalid Request.
   *
   * @apiErrorExample Error-Response:
   *     {
   *       'status':'error',
   *       'error': message
   *     }
   */
  async login(req, res) {
    try {
      baseHelper.log("Inside User Login");

      const requiredFields = ["email", "password"];
      baseHelper.validateRequired(req.body, requiredFields);

      const { email: userEmail, password } = baseHelper.trimData(req.body);

      const email = userEmail.toLowerCase();

      const user = await Users.findOne({ "email.address": email }).lean();

      if (!user) {
        return baseHelper.response(res, baseHelper.error("Oops, Looks like you are not registered on Crownstack, Please register to login into our portal"));
      }

      const { password: userPassword } = user;

      if (!(userPassword && baseHelper.comparePassword(password, userPassword))) {
        return baseHelper.response(res, baseHelper.error("Incorrect credentials provided"), 422);
      }

      const tokenData = baseHelper.getTokenData(user);

      const { token } = await UserToken.create(tokenData);

      return baseHelper.response(res, baseHelper.success(token));
    } catch (err) {
      baseHelper.warn(err.message);
      return baseHelper.response(res, baseHelper.error(err.message), 422);
    }
  }
}

module.exports = new UserController();
