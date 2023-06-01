import { Err } from "../helpers/errorHandler.js";
import categoryModel from "../models/categoryModel.js";
import missionModel from "../models/missionModel.js";

export const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryModel.find({ created_by: req.user._id });
        return res.status(200).json({ categories, message: "Categories fetched successfully." });
    }
    catch (err) {
        next(err);
    }
}

export const createCategory = async (req, res, next) => {
    try {
        const { name, tag_name, color } = req.body;

        const newCategory = await categoryModel.create({ name, tag_name, color, created_by: req.user._id });

        return res.status(200).json({ newCategory, message: "Category created successfully." });
    }
    catch (err) {
        next(err);
    }
}

export const updateCategory = async (req, res, next) => {
    try {
        const { name, tag_name, color } = req.body;

        const { categoryId } = req.params;

        const category = await categoryModel.findById(categoryId);

        if (category) {
            if (category.created_by == req.user._id) {
                category.name = name;
                category.tag_name = tag_name;
                category.color = color;

                await category.save();

                return res.status(200).json({ category, message: "Category updated Successfully." });
            }
            else
                throw new Err('You are not allowed to perform this action.', 401);
        }
        else
            throw new Err('This category no longer exists.', 400);
    }
    catch (err) {
        next(err);
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;

        await missionModel.updateMany({ category: categoryId }, { $unset: { category: 1 } })

        const category = await categoryModel.findByIdAndDelete(categoryId);

        if (category)
            return res.status(200).json({ category, message: "Category deleted successfully." });
        else
            throw new Err("Category not found.", 400);
    }
    catch (err) {
        next(err);
    }
}