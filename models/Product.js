const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product Name is required."],
    },
    description: {
        type: String,
        required: [true, "Product Description is required."],
    },
    price: { type: Number, required: [true, "Price is Required"] },
    dateRegistered: { type: Date, default: new Date() },
    isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Product", productSchema, "products");
