import express from 'express';
import { createSite, deleteSite, getSites, updateSite } from '../controllers/siteController.js';
import { checkParams } from "../middlewares/validation.js";

const router = express.Router();

router.get('/', getSites) 
router.post('/create', createSite);
router.put('/:siteId/update', checkParams, updateSite);
router.delete('/:siteId', checkParams, deleteSite);

export default router;