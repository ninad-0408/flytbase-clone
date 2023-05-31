import siteModel from "../models/siteModel.js";
import { Err } from "../helpers/errorHandler.js";

export const getSite = async (req, res, next) => {
    try {
        const sites = await siteModel.find({ created_by: req.user._id, status: 'active' });
        return res.status(200).json({ sites, message: 'All Sites fetched Successfully.' });
    }
    catch(err) {
        next(err)
    }
}

export const createSite = async (req, res, next) => {
    try {
        const { site_name, latitude, longitude } = req.body;
        const position = { latitude, longitude };

        const newSite = await siteModel.create({ site_name, position, status: 'active', created_by: req.user._id });

        return res.status(200).json({ site: newSite, message: "New site created Successfully."});
    }
    catch(err) {
        next(err);
    }
}

export const updateSite = async (req, res, next) => {
    try {
        const { site_name, latitude, longitude } = req.body;
        const position = { latitude, longitude };
        const { siteId } = req.params;

        let site = await siteModel.findOne({ _id: siteId, status: 'active' });

        if(site) {
            if (site.created_by == req.user._id) {
                site.site_name = site_name;
                site.position = position;

                await site.save();

                return res.status(200).json({ site, message: "Site updated Successfully."});
            }
            else 
                throw new Err('You are not allowed to perform this action.', 401);
        }
        else 
            throw new Err('This site no longer exists.', 400);

    }
    catch(err) {
        next(err);
    }
}

export const deleteSite = async (req, res, next) => {
    try {
        const { siteId } = req.params;

        let site = await siteModel.findOne({ _id: siteId, status: 'active' });

        if(site) {
            if (site.created_by == req.user._id) {
                site.status = 'deleted';
                site.deleted_on = new Date();

                await site.save();

                return res.status(200).json({ site, message: "Site deleted Successfully."});
            }
            else 
                throw new Err('You are not allowed to perform this action.', 401);
        }
        else 
            throw new Err('This site no longer exists.', 400);
    }
    catch(err) {
        next(err);
    }
}