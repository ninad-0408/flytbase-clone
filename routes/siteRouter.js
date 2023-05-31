import express from 'express';
import { createSite, deleteSite, getSite, updateSite } from '../controllers/siteController.js';

const router = express.Router();

router.get('/', getSite)
router.post('/create', createSite);
router.put('/:siteId/update', updateSite);
router.delete('/:siteId', deleteSite);

export default router;