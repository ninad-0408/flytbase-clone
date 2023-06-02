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
                            const token = jwt.sign({ email: data.email, _id: data._id, admin: data.admin, timestamp: Date.now() }, process.env.HASHTOKEN);
                            res.cookie('jwtToken', token, { httpOnly: true, maxAge: 24*60*60*1000 }) // Expires in a day
                            return res.status(200).json({ email: data.email, message: "You are logged in successfully." });
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

    try {
        const { name, email, password, confirmPassword } = req.body;

        const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    
        if (!emailRegex.test(email))
            throw new Err("Please enter a valid email.", 400);
    
        if (password.length < 8)
            throw new Err("Password too short.", 400);
        
        const lowerCaseEmail = email.toLowerCase()
    
        // check duplicate email
        await userModel.findOne({ lowerCaseEmail })
            .then((data) => {
                if (data) {
                    if (data.email == lowerCaseEmail)
                        throw new Err("Email entered is already registered with us.", 403);
                }
            })
            .catch((err) => {
                next(err);
            });
        
        if (password !== confirmPassword)
            throw new Err("Password and Confirm Password don't match.", 403);
    
        // hashing password and creating user
        bcrypt.hash(password, 4)
            .then((hash) => {
                userModel.create({ name, email: lowerCaseEmail, password: hash })
                    .then((data) => {
                        const token = jwt.sign({ email: data.email, _id: data._id, admin: false, timestamp: Date.now() }, process.env.HASHTOKEN);
                        res.cookie('jwtToken', token, { httpOnly: true, maxAge: 24*60*60*1000 }) // Expires in a day
                        return res.status(200).json({ email: data.email, message: "You are signuped successfully." });
                    })
                    .catch((err) => {
                        next(err);
                    });
            })
            .catch((err) => {
                next(err);
            });
    } catch (err) {
        next(err);
    }
};
