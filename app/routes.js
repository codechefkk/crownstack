// importing packages
const { Router } = require("express");

// Module dependencies
const categoryController = require('./controller/category');
const productController = require('./controller/product');
const userController = require('./controller/user');

// import helpers
const routeHelper = require('./utils/route');

const router = Router();

const verifyRequest = function verifyRequest(req, res, next) {
  routeHelper.verifyRequest(req, res, next);
};

// public routes
router.post("/user/register", userController.register);
router.post("/user/login", userController.login);

router.use(verifyRequest);

// private routes
router.post("/category", categoryController.create);

router.post("/product", productController.create);

module.exports = router;
