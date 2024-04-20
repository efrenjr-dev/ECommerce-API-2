const Product = require("../models/Product");

testController = (req, res) => {
    console.log("TEST Product Controller");
    res.send({ message: "TEST Product Controller" });
};

createProduct = (req, res) => {
    console.log("POST Create Product");
    // return res.send({ message: "POST Create Product" });
    const newProduct = new Product({
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
    });
    newProduct
        .save()
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

module.exports = {
    testController,
    createProduct,
};
