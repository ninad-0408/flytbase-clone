import express from 'express';
import { createSite, deleteSite, getSites, updateSite } from '../controllers/siteController.js';

const router = express.Router();

router.get('/', getSites) 
router.post('/create', createSite);
router.put('/:siteId/update', updateSite);
router.delete('/:siteId', deleteSite);

export default router;