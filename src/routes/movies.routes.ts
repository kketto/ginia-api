import { Router } from "express";
import { addMovie, changeRate, editMovie, getMovieById, getMovies, searchMovie } from "../controllers/movies.controller";
const router = Router();


router.get("/movies", getMovies);
router.get("/movies/:id", getMovieById);
router.get("/movies/search/:term", searchMovie);
router.post("/movies", addMovie);
router.put("/movies/:id/changeRate", changeRate);
router.put("/movies/:id", editMovie);




export default router;