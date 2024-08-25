import { Schema, model } from "mongoose";

const productSchema = new Schema({
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
    orders: [
        {
            priceSold: Number,
            quantity: Number,
            userId: String,
            dateOrdered: { type: Date, default: new Date() },
            orderStatus: { type: String, default: "Complete" },
        },
    ],
});

module.exports = model("Product", productSchema, "products");
