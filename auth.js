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

module.exports.verify = (req, res, next) => {
    console.log(req.headers.authorization);
    // console.log(req.headers.authorization.slice(7));
    // return res.send({ authheader: req.headers.authorization });
    const token = req.headers.authorization.slice(7);
    jwt.verify(token, SECRET, function (err, decoded) {
        if (err) {
            return res.send(err);
        } else {
            console.log(decoded);
            req.user = decoded;
            // res.send({ user: decoded });
            next();
        }
    });
};

module.exports.verifyAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        res.send({ message: "User not authorized." });
    }
    next();
};
