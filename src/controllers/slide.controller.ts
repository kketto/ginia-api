import { Request, Response } from "express";
import { Slide } from "../entity/Slide";

export async function getSlide(req: Request, res: Response) {

    const slide = await Slide.find();

    return res.json(slide);

}