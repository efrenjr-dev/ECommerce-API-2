const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");

const { testController } = userControllers;

router.get("/", testController);

module.exports = router;
