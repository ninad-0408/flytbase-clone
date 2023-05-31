import express from "express";

const router = express.Router();

router.get('/:droneId');
router.get('mission/:missionId');
router.get('site/:siteId');
router.post('/create');  // add admin check
router.put('/:droneId/update');
router.delete('/:droneId'); // add admin check

export default router;