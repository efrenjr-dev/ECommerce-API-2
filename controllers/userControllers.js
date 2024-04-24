const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = 10;
const { createAccessToken } = require("../auth");
const Product = require("../models/Product");


registerUser = (req, res) => {
    console.log("POST User");
    console.log(req.body);

    if (req.body.password.length < 8)
        return res.send({
            message: "Password should be at least 8 characters.",
        });

    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    console.log(hashedPassword);

    User.findOne({ email: req.body.email })
        .then((foundUser) => {
            console.log(foundUser.email);
            if (foundUser !== null && foundUser.email === req.body.email) {
                return res.send({ message: "Duplicate Email Found." });
            } else {
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    mobileNo: req.body.mobileNo,
                    email: req.body.email,
                    password: hashedPassword,
                });
                newUser
                    .save()
                    .then((result) => res.send(result))
                    .catch((err) => res.send(err));
            }
        })
        .catch((err) => res.send(err));

    // res.send({ message: `POST User ${hashedPassword}` });
};

loginUser = (req, res) => {
    console.log("PUT Login");
    //return res.send({ message: "PUT Login" });
    console.log(req.body);

    User.findOne({ email: req.body.email })
        .then((foundUser) => {
            console.log(foundUser);
            if (foundUser === null) {
                res.send({ message: "User Email does not exist." });
            } else {
                // res.send({"message":"User Found"})
                const match = bcrypt.compareSync(
                    req.body.password,
                    foundUser.password
                );
                console.log(match);
                if (match) {
                    console.log("Password Match");
                    return res.send({
                        accessToken: createAccessToken(foundUser),
                    });
                } else {
                    return res.send({
                        message: "Password is incorrect.",
                    });
                }
            }
        })
        .catch((err) => res.send(err));
};

setAdmin = (req, res) => {
    console.log("PUT Set Admin");
    // return res.send({ message: "PUT Set Admin", id: req.params.id });

    let updates = { isAdmin: true };

    User.findByIdAndUpdate(req.params.id, updates, { new: true })
        .then((updatedUser) => {
            if (updatedUser === null) {
                res.send({ message: "No User Found." });
            }
            res.send(updatedUser);
        })
        .catch((err) => res.send(err));
};

createOrder = async (req, res) => {
    console.log("PUT Create Order");

    let productsArray = [];

    productsArray = req.body.products.map((product) => {
        console.log(product);
        return {
            productId: product.productId,
            productName: product.productName,
            priceSold: product.priceSold,
            quantity: product.quantity,
        };
    });
    console.log(productsArray);

    let isUserUpdated = await User.findById(req.user.id).then((foundUser) => {
        foundUser.orders.push({
            products: productsArray,
            totalAmount: req.body.totalAmount,
            userId: req.user.id,
        });

        return foundUser
            .save()
            .then((result) => true)
            .catch((err) => err.message);
    });

    console.log(`isUserUpdated? ${isUserUpdated}`);
    if (isUserUpdated !== true)
        return res.send({ message: "User is not Updated." });

    let isSingleProductUpdated = false;
    let productUpdateCounter = 0;

    for (let index = 0; index < productsArray.length; index++) {
        // console.log(index);
        isSingleProductUpdated = await Product.findById(
            productsArray[index].productId
        )
            .then((foundProduct) => {
                foundProduct.orders.push({
                    quantity: productsArray[index].quantity,
                    priceSold: productsArray[index].priceSold,
                    userId: req.user.id,
                });

                return foundProduct
                    .save()
                    .then((result) => true)
                    .catch((err) => err.message);
            })
            .catch((err) => err.message);
        // console.log("isSingleProductUpdated? " + isSingleProductUpdated);
        if (isSingleProductUpdated === true) {
            productUpdateCounter++;
            isSingleProductUpdated = false;
        }
    }
    // console.log(
    //     `productUpdateCounter ${productUpdateCounter} productArray.length ${productsArray.length}`
    // );
    let isProductUpdated = productUpdateCounter === productsArray.length;
    console.log("isProductUpdated? " + isProductUpdated);
    if (isProductUpdated !== true) {
        return res.send({
            message: `Only ${productUpdateCounter} of ${productsArray.length} Product(s) Updated.`,
        });
    }

    if (isUserUpdated && isProductUpdated) {
        return res.send({ message: "Order has been Created." });
    }
};

getAllOrders = (req, res) => {
    console.log("GET All Orders");

    let ordersArray = [];

    User.find()
        .then((foundUsers) => {
            foundUsers.forEach((user) => {
                user.orders.forEach((order) => {
                    // console.log(order);
                    if (order !== null) {
                        ordersArray.push(order);
                    }
                });
            });
            return res.send(ordersArray);
        })
        .catch((err) => res.send(err));
};

getUserOrders = (req, res) => {
    console.log("GET User Orders");

    User.findById(req.user.id)
        .then((foundUser) => {
            res.send(foundUser.orders);
        })
        .catch((err) => res.send(err));
};

module.exports = {
    registerUser,
    loginUser,
    setAdmin,
    createOrder,
    getAllOrders,
    getUserOrders,
};
