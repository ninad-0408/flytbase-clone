import express from "express";
import { createMission, deleteMission, getMissions, updateMission } from "../controllers/missionController.js";

const router = express.Router();

router.get('/', getMissions);
router.post('/create', createMission);
router.put('/:missionId/update', updateMission);
router.delete('/:missionId', deleteMission);

export default router;