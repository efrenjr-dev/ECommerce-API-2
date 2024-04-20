const express = require("express");
const router = express.Router();
const { verify, verifyAdmin, verifyNotAdmin } = require("../auth");

const userControllers = require("../controllers/userControllers");

const { testController, registerUser, loginUser, setAdmin, createOrder } =
    userControllers;

router.get("/", testController);
router.post("/register", registerUser);
router.put("/login", loginUser);
router.put("/setAdmin/:id", verify, verifyAdmin, setAdmin);
router.put("/createOrder", verify, verifyNotAdmin, createOrder);

// router.put("/verify", verify);

module.exports = router;
