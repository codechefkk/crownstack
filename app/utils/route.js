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

    if (token !== 'OJaPcoJX0NKmsdraDUmI') {
      console.warn("Invalid Request");
      res.status(403).send({ status: 'error', error: "Invalid Request" });
    } else {
      next();
    }
  }
}

module.exports = new RouteHelper();
