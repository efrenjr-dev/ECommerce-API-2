import { Schema, model } from "mongoose";

interface IUser {
    firstName: string;
    lastName: string;
    mobileNo: string;
    email: string;
    password: string;
    dateRegistered: Date;
    isAdmin: Boolean;
    orders: Array<{
        products: Array<{
            productId: string;
            productName: string;
            priceSold: number;
            quantity: number;
        }>;
        totalAmount: number;
        userId: string;
        dateOrdered: Date;
        orderStatus: string;
    }>;
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: [true, "First Name is required."] },
    lastName: { type: String, required: [true, "Last Name is required."] },
    mobileNo: { type: String, required: [true, "Mobile Number is required."] },
    email: { type: String, required: [true, "Email is required."] },
    password: { type: String, required: [true, "Password is required."] },
    dateRegistered: { type: Date, default: new Date() },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    orders: [
        {
            products: [
                {
                    productId: String,
                    productName: String,
                    priceSold: Number,
                    quantity: Number,
                },
            ],
            totalAmount: Number,
            userId: String,
            dateOrdered: { type: Date, default: new Date() },
            orderStatus: { type: String, default: "Complete" },
        },
    ],
});

export default model("User", userSchema, "users");
