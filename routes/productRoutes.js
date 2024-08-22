const express = require("express");
const router = express.Router();
const { verify, verifyAdmin } = require("../auth");

const productControllers = require("../controllers/productControllers");

const {
    createProduct,
    retrieveAllProducts,
    retrieveActiveProducts,
    retrieveSingleProduct,
    updateProduct,
    archiveProduct,
    activateProduct,
} = productControllers;

// router.get("/", testController);
router.post("/", verify, verifyAdmin, createProduct);
router.get("/all", verify, verifyAdmin, retrieveAllProducts);
router.get("/", retrieveActiveProducts);
router.get("/:id", retrieveSingleProduct);
router.put("/:id", verify, verifyAdmin, updateProduct);
router.put("/archive/:id", verify, verifyAdmin, archiveProduct);
router.put("/activate/:id", verify, verifyAdmin, activateProduct);

module.exports = router;
