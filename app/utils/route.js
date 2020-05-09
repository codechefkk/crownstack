// import collections
const { User, UserToken } = require('../models');

class RouteHelper {
  /**
   * @desc To verify the provided request
   * @param req request object
   * @param res response object
   * @param next callback
   *
   * @return res/next()
   */
  verifyRequest(req, res, next) {
    const { headers }  = req;
    const token = headers['token'] || '';

    let isInvalidRequest = false;

    if (!token) {
      isInvalidRequest = true;
    } else {
      const tokenRecord = await UserToken.findOne({ token });
      const { userId = "" } = tokenRecord || {};
      if (!userId) {
        isInvalidRequest = true;
      }
      const user = await User.findOne({ id: userId }).lean();
      if (!user) {
        isInvalidRequest = true;
      } else {
        req.user = { ...user };
      }
    }

    if (isInvalidRequest) {
      console.warn("Invalid Request");
      res.status(403).send({ status: 'error', error: "Invalid Request" });
    } else {
      next();
    }
  }
}

module.exports = new RouteHelper();
