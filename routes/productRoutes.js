const express = require("express");
const router = express.Router();

const productControllers = require("../controllers/productControllers");

const { testController } = productControllers;

router.get("/", testController);

module.exports = router;
