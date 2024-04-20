const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports.createAccessToken = (user) => {
    console.log("AUTH Create Access Token");
    // console.log(user);
    const userData = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    };
    console.log(userData);
    return jwt.sign(userData, SECRET, {});
};
