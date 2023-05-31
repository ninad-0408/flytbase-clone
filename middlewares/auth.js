import jwt from 'jsonwebtoken';
import { Err } from '../helpers/errorHandler.js'

import dotenv from "dotenv";
dotenv.config();

export const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(token)
    req.user = jwt.verify(token, process.env.HASHTOKEN);
    next();
}

export const isLoggedIn = (req, res, next) => {
    if(req.user)
        next();
    else 
        next(new Err('You are not logged in.', 403));
}