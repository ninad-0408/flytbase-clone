import express from "express";
import { isAdmin } from "../middlewares/auth.js";
import { createDrone, deleteDrone, getCategoryDrones, getDrones, getMissionDrones, getSiteDrones, updateDrone } from "../controllers/droneController.js";

const router = express.Router();

router.get('/', getDrones);
router.get('/mission/:missionId', getMissionDrones);
router.get('/site/:siteId', getSiteDrones);
router.get('/category/:categoryId', getCategoryDrones);
router.post('/create', isAdmin, createDrone);
router.put('/:droneId/update', updateDrone);
router.delete('/:droneId', isAdmin, deleteDrone);

export default router;