const User = require("../models/User");

testController = (req, res) => {
    console.log("TEST User Controller");
    res.send({ message: "TEST User Controller" });
};

module.exports = {
    testController,
};
