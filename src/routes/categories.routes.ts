import { Router } from "express";
import { addCategory, editCategory, getCategories, getCategoryBySlug, getCategoryLabelsByID, moviesByCategoryId } from "../controllers/category.controller";
const router = Router();


router.get("/categories", getCategories);
router.get("/categories/labels", getCategoryLabelsByID);
router.get("/categories/:slug", getCategoryBySlug);
router.get("/categories/:id/movies", moviesByCategoryId);
router.put("/categories/:id", editCategory);
router.post("/categories", addCategory)

export default router;