import { Router } from "express";
import { addMovie, changeRate, editMovie, getMovieById, getMovies, searchMovie } from "../controllers/movies.controller";
import { authGuard } from "../guards/auth.guard";
const router = Router();


router.get("/movies", getMovies);
router.get("/movies/:id", getMovieById);
router.get("/movies/search/:term", searchMovie);
router.post("/movies", authGuard, addMovie);
router.put("/movies/:id/changeRate", changeRate);
router.put("/movies/:id", authGuard, editMovie);




export default router;