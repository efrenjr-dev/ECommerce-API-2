const express = require("express");
const router = express.Router();
const { verify, verifyAdmin, verifyNotAdmin } = require("../auth");

const userControllers = require("../controllers/userControllers");

const {
    registerUser,
    loginUser,
    setAdmin,
    createOrder,
    getAllOrders,
    getUserOrders,
    getUserDetails,
} = userControllers;

router.get("/", verify, getUserDetails);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/setAdmin/:id", verify, verifyAdmin, setAdmin);
router.put("/createOrder", verify, verifyNotAdmin, createOrder);
router.get("/allOrders", verify, verifyAdmin, getAllOrders);
router.get("/myOrders", verify, verifyNotAdmin, getUserOrders);

// router.put("/verify", verify);

module.exports = router;
