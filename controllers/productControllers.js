const Product = require("../models/Product");

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

retrieveAllProducts = (req, res) => {
    console.log("GET All Products");
    // return res.send("GET All Products");
    Product.find()
        .then((products) => res.send(products))
        .catch((err) => res.send(err));
};

module.exports = {
    createProduct,
    retrieveAllProducts,
};
