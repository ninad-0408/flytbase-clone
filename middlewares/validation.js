import mongoose from "mongoose"
import { Err } from "../helpers/errorHandler.js";

export const checkParams = (req, res, next) => {

    try {
        for ( let id in req.params )
            if (!mongoose.Types.ObjectId.isValid(req.params[id]))
                throw new Err("Invalid Request.", 401);
        next()
    } catch (err) {
        next(err);        
    }
}