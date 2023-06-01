import express from "express";
import { createMission, deleteMission, getCategoryMissions, getMissions, getSiteMissions, updateMission } from "../controllers/missionController.js";

const router = express.Router();

router.get('/', getMissions);
router.get('/site/:siteId', getSiteMissions);
router.get('/category/:categoryId', getCategoryMissions);
router.post('/create', createMission);
router.put('/:missionId/update', updateMission);
router.delete('/:missionId', deleteMission);

export default router;