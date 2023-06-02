import express from "express";
import { isAdmin } from "../middlewares/auth.js";
import { createDrone, deleteDrone, getCategoryDrones, getDrones, getMissionDrones, getSiteDrones, updateDrone } from "../controllers/droneController.js";
import { checkParams } from "../middlewares/validation.js";

const router = express.Router();

router.get('/', getDrones);
router.get('/mission/:missionId', checkParams, getMissionDrones);
router.get('/site/:siteId', checkParams, getSiteDrones);
router.get('/category/:categoryId', checkParams, getCategoryDrones);
router.post('/create', isAdmin, createDrone);
router.put('/:droneId/update', checkParams, updateDrone);
router.delete('/:droneId', checkParams, isAdmin, deleteDrone);

export default router;