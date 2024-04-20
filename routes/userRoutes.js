const express = require("express");
const router = express.Router();
const { verify, verifyAdmin } = require("../auth");

const userControllers = require("../controllers/userControllers");

const { testController, registerUser, loginUser, setAdmin } = userControllers;

router.get("/", testController);
router.post("/register", registerUser);
router.put("/login", loginUser);
router.put("/setAdmin/:id",verify,verifyAdmin, setAdmin);

// router.put("/verify", verify);

module.exports = router;
