import { Err } from "../helpers/errorHandler.js";
import categoryModel from "../models/categoryModel.js";
import missionModel from "../models/missionModel.js";
import siteModel from "../models/siteModel.js";

export const getMissions = async (req, res, next) => {
    try {
        const sites = await siteModel.find({ created_by: req.user._id, status: { $ne: 'deleted' } }, { _id: 1 });

        const siteIds = sites.map((site) => site._id);

        const missions = await missionModel.find({ site: { $in: siteIds }, status: { $ne: 'deleted' } });

        return res.status(200).json({ missions, message: "Missions fetched successfully."});
    }
    catch (err) {
        next(err);
    }
}

export const createMission = async (req, res, next) => {
    try {
        const { name, speed, alt, waypoints, site, category } = req.body;

        const checkSite = await siteModel.findOne({ _id: site, status: 'active' });

        if (!checkSite)
            throw new Err("Site not found or site is not active.", 400);
        
        if (site.created_by != req.user._id)
            throw new Err('You are not allowed to perform this action.', 401);

        const checkCategory = await categoryModel.findOne({ _id: category, created_by: req.user._id });

        if (!checkCategory)
            throw new Err("Category not found.", 400);

        const newMission = await missionModel.create({ name, speed, alt, waypoints, site, category });

        return res.status(200).json({ newMission, message: "New mission created successfully." });
    }
    catch (err) {
        next(err);
    }
}

export const updateMission = async (req, res, next) => {
    try {
        const { name, speed, alt, waypoints, category } = req.body;
        const { missionId } = req.params;

        const mission = await missionModel.findOne({ _id: missionId, status: { $ne: 'deleted' } })
                                          .populate('site', 'created_by');
        
        if (mission) {
            if (mission.site.created_by == req.user._id) {
                const checkCategory = await categoryModel.findOne({ _id: category, created_by: req.user._id });

                if (!checkCategory)
                    throw new Err("Category not found.", 400);

                mission.name = name;
                mission.speed = speed;
                mission.alt = alt;
                mission.waypoints = waypoints;
                mission.category = category;

                await mission.save();

                return res.status(200).json({ mission, message: "New mission created successfully." });
            }
            else
                throw new Err('You are not allowed to perform this action.', 401);
        }
        else
            throw new Err('Mission not found.', 400);

    }
    catch (err) {
        next(err);
    }
}

export const deleteMission = async (req, res, next) => {
    try {
        const { missionId } = req.params;

        const mission = await missionModel.findOne({ _id: missionId, status: { $ne: 'deleted' } })
                                          .populate('site', 'created_by');

        if (mission) {
            if (mission.site.created_by == req.user._id) {
                
                mission.deleted_on = new Date();
                mission.status = 'deleted';

                await mission.save();

                return res.status(200).json({ mission, message: "Mission deleted successfully." });
            }
            else
                throw new Err('You are not allowed to perform this action.', 401);
        }
        else
            throw new Err('Mission not found.', 400);
                                    
    }
    catch (err) {
        next(err);
    }
}
