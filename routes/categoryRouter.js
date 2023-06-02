import express from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/categoryController.js";
import { checkParams } from "../middlewares/validation.js";

const router = express.Router();

router.get('/', getCategories);
router.post('/create', createCategory);
router.put('/:categoryId/update', checkParams, updateCategory);
router.delete('/:categoryId', checkParams, deleteCategory);

export default router;