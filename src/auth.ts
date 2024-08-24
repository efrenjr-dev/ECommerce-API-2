import assert from "assert";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

assert(process.env.SECRET, "JWT SECRET must be defined.");
const SECRET = process.env.SECRET;

type User = {
    _id: string;
    email: string;
    isAdmin: boolean;
};

interface VerifyRequest extends Request {
    user?: any;
}

const createAccessToken = (user: User) => {
    console.log("AUTH Create Access Token");
    // console.log(user);
    const userData = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    };
    // console.log(userData);
    return jwt.sign(userData, SECRET, {});
};

const verify = (req: VerifyRequest, res: Response, next: NextFunction) => {
    // console.log(req.headers.authorization);
    // console.log(req.headers.authorization.slice(7));
    // return res.send({ authheader: req.headers.authorization });
    assert(req.headers.authorization, "Authorization header is missing.");
    if (!req.headers.authorization) {
        throw new Error("Authorization header is missing.");
    }
    const token = req.headers.authorization.slice(7);
    jwt.verify(token, SECRET, function (err, decoded) {
        if (err) {
            return res.send(err);
        } else {
            // console.log(decoded);
            req.user = decoded;
            // res.send({ user: decoded });
            next();
        }
    });
};

const verifyAdmin = (req: VerifyRequest, res: Response, next: NextFunction) => {
    if (!req.user.isAdmin) {
        res.send({ message: "User not authorized." });
    }
    next();
};

const verifyNotAdmin = (
    req: VerifyRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.user.isAdmin) {
        res.send({ message: "User not authorized." });
    }
    next();
};

module.exports = { createAccessToken, verify, verifyAdmin, verifyNotAdmin };