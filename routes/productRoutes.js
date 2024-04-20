const express = require("express");
const router = express.Router();
const { verify, verifyAdmin } = require("../auth");

const productControllers = require("../controllers/productControllers");

const { testController, createProduct } = productControllers;

router.get("/", testController);
router.post("/", verify, verifyAdmin, createProduct);

module.exports = router;
