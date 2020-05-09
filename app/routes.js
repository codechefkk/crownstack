// importing packages
const { Router } = require("express");

// Module dependencies
const userController = require('./controller/user');

// import helpers
const routeHelper = require('./utils/route');

const router = Router();

const verifyRequest = function verifyRequest(req, res, next) {
  routeHelper.verifyRequest(req, res, next);
};

router.use(verifyRequest);

// routes
router.post("/user/register", userController.register);
router.post("/user/login", userController.login);

module.exports = router;
