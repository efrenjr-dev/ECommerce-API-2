import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 4000;

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.2ttig.gcp.mongodb.net/${process.env.DB_DB}?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`
    );
}

let db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));

app.use(cors());
app.use(express.json());

import userRouter from "./routes/userRoutes";
app.use("/users", userRouter);

import productRouter from "./routes/productRoutes";
app.use("/products", productRouter);

app.get("/", (request: Request, response: Response) => {
    response.status(200).send("Express Ecommerce API");
});

app.listen(port, () => console.log(`Server is running at port ${port}`));

module.exports = app;
