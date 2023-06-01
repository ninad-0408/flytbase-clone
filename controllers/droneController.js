import { Err } from "../helpers/errorHandler";
import droneModel from "../models/droneModel";

export const getDrone = async (req, res, next) => {
    try {
        const { droneId } = req.params;

        // apply constraints on created_by or assigned_to

        const drone = await droneModel.findById(droneId);

        if (drone)
            return res.status(200).json({ drone, message: "Drone details fetched successfully." });
        else
            throw new Err("Unable to find the specified drone.", 404);
    }
    catch (err) {
        next(err);
    }
}

export const getMissionDrones = async (req, res, next) => {
    try {
        const { missionId } = req.params;

        // check mission id exists and created by current user

        const missionDrones = await droneModel.find({ mission: missionId });

        return res.status(200).json({ missionDrones, message: "Drones fetched successfully." });
    }
    catch (err) {
        next(err);
    }
}

export const getSiteDrones = async (req, res, next) => {
    try {
        const { siteId } = req.params;

        // check site id exists and created by current user

        const siteDrones = await droneModel.find({ site: siteId });

        return res.status(200).json({ siteDrones, message: "Drones fetched successfully." });
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
        const { name, make_name, site } = req.body;
        const { droneId } = req.params;

        const drone = await droneModel.findById(droneId);

        if (drone) {
            if (drone.assigned_to == req.user._id) {
                drone.name = name;
                drone.make_name = make_name;
                drone.site = site;

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

        const drone = await droneModel.findOne({ _id: droneId, status: { $ne: "deleted" } });

        if (drone) {
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

