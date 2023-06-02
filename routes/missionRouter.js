import express from "express";
import { createMission, deleteMission, getCategoryMissions, getMissions, getSiteMissions, updateMission } from "../controllers/missionController.js";
import { checkParams } from "../middlewares/validation.js";

const router = express.Router();

router.get('/', getMissions);
router.get('/site/:siteId', checkParams, getSiteMissions);
router.get('/category/:categoryId', checkParams, getCategoryMissions);
router.post('/create', createMission);
router.put('/:missionId/update', checkParams, updateMission);
router.delete('/:missionId', checkParams, deleteMission);

export default router;