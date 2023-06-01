import { Err } from "../helpers/errorHandler.js";
import droneModel from "../models/droneModel.js";
import missionModel from "../models/missionModel.js";
import categoryModel from "../models/categoryModel.js";

export const getDrones = async (req, res, next) => {
    try {
        const drones = await droneModel.find({ assigned_to: req.user._id, created_by: req.user._id, status: { $ne: 'deleted' } });
        return res.status(200).json({ drones, message: "Drones fetched successfully." });
    }
    catch (err) {
        next(err);
    }
}

export const getMissionDrones = async (req, res, next) => {
    try {
        const { missionId } = req.params;

        const checkMission = await missionModel.findOne({ _id: missionId, status: { $ne: 'deleted' } });

        if (!checkMission)
            throw new Err("Mission not found.", 400);

        const missionDrones = await droneModel.find({ mission: missionId, status: { $ne: 'deleted' } });

        return res.status(200).json({ missionDrones, message: "Drones fetched successfully." });
    }
    catch (err) {
        next(err);
    }
}

export const getSiteDrones = async (req, res, next) => {
    try {
        const { siteId } = req.params;

        const checkSite = await siteModel.findOne({ _id: site, status: { $ne: 'deleted' } });

        if (!checkSite)
            throw new Err("Site not found.", 400);

        const siteDrones = await droneModel.find({ site: siteId, status: { $ne: 'deleted' } });

        return res.status(200).json({ siteDrones, message: "Drones fetched successfully." });
    }
    catch (err) {
        next(err);
    }
}

export const getCategoryDrones = async (req, res, next) => {
    try {
        const { categoryId } = req.params;

        const checkCategory = await categoryModel.findOne({ _id: categoryId, created_by: req.user._id });

        if (!checkCategory)
            throw new Err("Category not found.", 400);

        const categoryMissions = await missionModel.find({ category: categoryId, status: { $ne: 'deleted' } }, { _id: 1 });

        const missionIds = categoryMissions.map((mission) => mission._id.toString());

        const categoryDrones = await droneModel.find({ mission: { $in: missionIds }, status: { $ne: 'deleted' } })

        return res.status(200).json({ categoryDrones, message: "Drones fetched successfully." });
    }
    catch (err) {
        next(err);
    }
}

export const createDrone = async (req, res, next) => {
    try {
        const { drone_id, name, make_name, drone_type, assigned_to } = req.body;

        const newDrone = await droneModel.create({ drone_id, name, make_name, drone_type, assigned_to, created_by: req.user._id });

        return res.status(200).json({ newDrone, message: "New drone added successfully." });
    }
    catch (err) {
        next(err);
    }
}

export const updateDrone = async (req, res, next) => {
    try {
        const { name, make_name, site, mission } = req.body;
        const { droneId } = req.params;

        const drone = await droneModel.findOne({ _id: droneId, status: { $ne: 'deleted' } });

        if (drone) {
            if (req.user.admin || drone.assigned_to == req.user._id) {

                const checkSite = await siteModel.findOne({ _id: site, status: 'active' });

                if (!checkSite)
                    throw new Err("Site not found or site is not active.", 400);
                
                if (req.user.admin != true && checkSite.created_by != req.user._id)
                    throw new Err('You are not allowed to perform this action.', 401);

                const checkMission = await missionModel.findOne({ _id: mission, site, status: { $ne: 'deleted' } });

                if (!checkMission)
                    mission = undefined;
                              
                drone.name = name;
                drone.make_name = make_name;
                drone.site = site;
                drone.mission = mission;

                await drone.save();

                return res.status(200).json({ drone, message: "Drone updated Successfully." });
            }
            else
                throw new Err('You are not allowed to perform this action.', 401);
        }
        else
            throw new Err('Drone not found.', 400);
    }
    catch (err) {
        next(err);
    }
}

export const deleteDrone = async (req, res, next) => {
    try {
        const { droneId } = req.params;

        const drone = await droneModel.findOne({ _id: droneId, status: { $ne: "deleted" } })
                                      .populate('mission', 'status');

        if (drone) {
            if (drone.mission?.status && drone.mission?.status != 'deleted')
                throw new Err('Deletion failed: Drone is assigned to a mission.', 400);

            drone.deleted_by = req.user._id;
            drone.deleted_on = new Date();
            drone.status = "deleted";

            await drone.save();

            return res.status(200).json({ drone, message: "Drone deleted Successfully." });
        }
        else
            throw new Err('Drone not found.', 400);
    }
    catch (err) {
        next(err);
    }
}

