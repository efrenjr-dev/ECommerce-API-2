const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
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

const userRouter = require("./routes/userRoutes");
app.use("/users", userRouter);

const productRouter = require("./routes/productRoutes");
app.use("/products", productRouter);

app.get("/", (req, res) => {
    res.status(200).send("Ecommerce API Server");
});

app.listen(port, () => console.log(`Server is running at port ${port}`));

module.exports = app;
