const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");

const { testController, registerUser, login } = userControllers;

router.get("/", testController);
router.post("/register", registerUser);
router.put("/login",loginUser)

module.exports = router;
