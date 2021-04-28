import { Router } from "express";
import { addCategory, deleteCategory, editCategory, getCategories, getCategoryBySlug, getCategoryLabelsByID, moviesByCategoryId } from "../controllers/category.controller";
import { authGuard } from "../guards/auth.guard";
const router = Router();


router.get("/categories", getCategories);
router.get("/categories/labels", getCategoryLabelsByID);
router.get("/categories/:slug", getCategoryBySlug);
router.get("/categories/:id/movies", moviesByCategoryId);
router.put("/categories/:id", authGuard, editCategory);
router.post("/categories", authGuard, addCategory)
router.delete("/categories/:id", authGuard, deleteCategory)

export default router;