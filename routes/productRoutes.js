const express = require("express");
const router = express.Router();
const { verify, verifyAdmin } = require("../auth");

const productControllers = require("../controllers/productControllers");

const { createProduct, retrieveAllProducts, retrieveSingleProduct } =
    productControllers;

// router.get("/", testController);
router.post("/", verify, verifyAdmin, createProduct);
router.get("/", retrieveAllProducts);
router.get("/:id", retrieveSingleProduct);

module.exports = router;
