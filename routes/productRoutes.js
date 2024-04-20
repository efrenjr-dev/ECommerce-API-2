const express = require("express");
const router = express.Router();
const { verify, verifyAdmin } = require("../auth");

const productControllers = require("../controllers/productControllers");

const { createProduct, retrieveAllProducts } = productControllers;

// router.get("/", testController);
router.post("/", verify, verifyAdmin, createProduct);
router.get("/", retrieveAllProducts);

module.exports = router;
