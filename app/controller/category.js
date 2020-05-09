// import collections
const { Category } = require('../models');

// import helpers
const baseHelper = require('../utils/base');

class Category {
  constructor() {
    this.create = this.create.bind(this);
  }

  /**
   * @api {post} /category To create a category
   * @apiName Category
   * @apiGroup Crownstack
   *
   * @apiParam {String} name Name of category.
   * @apiParam {String} type Type of category (Can be "mirrorless", “full frame” or “point and shoot”).
   * @apiParam {Number} model Model year of category.
   *
   * @apiSuccess {String} status ok.
   * @apiSuccess {Boolean} data true.
   *
   * @apiSuccessExample Success-Response:
   *     {
   *       'status': 'ok',
   *       'data': true
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
  async create(req, res) {
    try {
      baseHelper.log("Inside Category Create");

      const requiredFields = ["name", "type", "model"];
      baseHelper.validateRequired(req.body, requiredFields);

      const data = baseHelper.trimData(req.body);

      const { name, type, model } = data;

      const createdCategory = await Category.create({
        name,
        type,
        model,
      });

      baseHelper.log(`Created category: ${createdCategory.id}`)
      return baseHelper.response(res, baseHelper.success(true));
    } catch (err) {
      baseHelper.warn(err.message);
      return baseHelper.response(res, baseHelper.error(err.message), 422);
    }
  }
}

module.exports = new Category();
