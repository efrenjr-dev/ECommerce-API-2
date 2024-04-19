const Product = require('../models/Product')

testController = (req, res) => {
    console.log("TEST Product Controller");
    res.send({ message: "TEST Product Controller" });
};

module.exports = {
    testController,
};
