import { Router } from "express";
import { getSlide } from "../controllers/slide.controller";
const router = Router();


router.get('/slide', getSlide);


export default router;