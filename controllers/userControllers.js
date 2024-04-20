const User = require("../models/User");
const bcrypt = require("bcrypt");
const SALT = process.env.SALT;
const { createAccessToken } = require("../auth");

testController = (req, res) => {
    console.log("TEST User Controller");
    res.send({ message: "TEST User Controller" });
};

registerUser = (req, res) => {
    console.log("POST User");
    console.log(req.body);

    if (req.body.password.length < 8)
        return res.send({
            message: "Password should be at least 8 characters.",
        });

    const hashedPassword = bcrypt.hashSync(req.body.password, SALT);
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

module.exports = {
    testController,
    registerUser,
    loginUser,
    setAdmin,
};
