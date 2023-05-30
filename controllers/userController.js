import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { Err } from "../helpers/errorHandler.js";

import dotenv from "dotenv";
dotenv.config();


export const userLogin = (req, res, next) => {
    const { email, password } = req.body;

    // check for user exsistance and token sign
    userModel.findOne({ email })
        .then((data) => {
            if (data) {
                bcrypt.compare(password, data.password)
                    .then((check) => {
                        if (check) {
                            const token = jwt.sign({ email: data.email, _id: data._id }, process.env.HASHTOKEN);
                            return res.status(200).json({ token, message: "You are logged in successfully." });
                        }
                        else
                            throw new Err('Invalid Credentials.', 403);
                    })
                    .catch((err) => {
                        next(err);
                    });
            }
            else
                throw new Err("Email does not exist.", 403);
        })
        .catch((err) => {
            next(err);
        });
};

export const userSignup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    // check duplicate email
    await userModel.findOne({ email })
        .then((data) => {
            if (data) {
                if (data.email == email)
                    throw new Err("Email entered is already registered with us.", 403);

                if (password !== confirmPassword)
                    throw new Err("Password and Confirm Password don't match.", 403);
            }
        })
        .catch((err) => {
            next(err);
        });

    // hashing password and creating user
    bcrypt.hash(password, 4)
        .then((hash) => {
            userModel.create({ name, email, password: hash })
                .then((data) => {
                    const token = jwt.sign({ email: data.email, _id: data._id }, process.env.HASHTOKEN);
                    return res.status(200).json({ token, message: "You are signuped successfully." });
                })
                .catch((err) => {
                    next(err);
                });
        })
        .catch((err) => {
            next(err);
        });
};
