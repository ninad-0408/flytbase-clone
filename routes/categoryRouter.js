import express from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.get('/', getCategories);
router.post('/create', createCategory);
router.put('/:categoryId/update', updateCategory);
router.delete('/:categoryId', deleteCategory);

export default router;