const Product = require("../models/Product");
const User = require("../models/User");

const createProduct = (req, res) => {
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

const retrieveAllProducts = (req, res) => {
    console.log("GET All Products");
    // return res.send("GET All Products");
    Product.find()
        .then((products) => res.send(products))
        .catch((err) => res.send(err));
};

const retrieveActiveProducts = (req, res) => {
    console.log("GET Active Products");
    // return res.send("GET All Products");
    Product.find({ isActive: true })
        .then((products) => res.send(products))
        .catch((err) => res.send(err));
};

const retrieveSingleProduct = (req, res) => {
    console.log("GET Single Product");
    Product.findById(req.params.id)
        .then((product) => res.send(product))
        .catch((err) => res.send(err));
};

const updateProduct = (req, res) => {
    console.log("PUT Update Product");

    const updates = {
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        isActive: req.body.isActive,
    };

    Product.findByIdAndUpdate(req.params.id, updates, { new: true })
        .then((updatedProduct) => res.send(updatedProduct))
        .catch((err) => res.send(err));
};

const archiveProduct = (req, res) => {
    console.log("PUT Archive Product");

    const updates = {
        isActive: false,
    };

    Product.findByIdAndUpdate(req.params.id, updates, { new: true })
        .then((updatedProduct) => res.send(updatedProduct))
        .catch((err) => res.send(err));
};

const activateProduct = (req, res) => {
    console.log("PUT Activate Product");

    const updates = {
        isActive: true,
    };

    Product.findByIdAndUpdate(req.params.id, updates, { new: true })
        .then((updatedProduct) => res.send(updatedProduct))
        .catch((err) => res.send(err));
};

module.exports = {
    createProduct,
    retrieveAllProducts,
    retrieveActiveProducts,
    retrieveSingleProduct,
    updateProduct,
    archiveProduct,
    activateProduct,
};
