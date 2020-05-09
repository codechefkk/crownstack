// import collections
const { Category, Product } = require('../models');

// import helpers
const baseHelper = require('../utils/base');

class Product {
  constructor() {
    this.create = this.create.bind(this);
  }

  /**
   * @api {post} /product To create a product
   * @apiName Product
   * @apiGroup Crownstack
   *
   * @apiParam {String} name Name of product.
   * @apiParam {String} category Category of product.
   * @apiParam {String} description Description of product.
   * @apiParam {Number} price Price of product.
   * @apiParam {Number} make Make of product.
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
      baseHelper.log("Inside Product Create");

      const requiredFields = ["name", "category", "description", "price", "make"];
      baseHelper.validateRequired(req.body, requiredFields);

      const data = baseHelper.trimData(req.body);

      const { name, category, description, price, make } = data;

      const categoryData = await Category.findOne({ name: category }).lean();

      if (!categoryData) {
        baseHelper.warn("Category doesn't exists");
        return baseHelper.response(res, baseHelper.error(`Please create "${category}" category in order to create product in this category`), 422);
      }

      const createdProduct = await Product.create({
        name,
        category,
        description,
        price,
        make,
      });

      baseHelper.log(`Product created: ${createdProduct.id}`)
      return baseHelper.response(res, baseHelper.success(true));
    } catch (err) {
      baseHelper.warn(err.message);
      return baseHelper.response(res, baseHelper.error(err.message), 422);
    }
  }
}

module.exports = new Product();
